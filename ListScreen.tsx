import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';

type Item = {
  index: number;
  id: string;
  content: string;
};

function generateRandomText(
  numParagraphs: number,
  numSentencesPerParagraph: number,
) {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ];
  const paragraphs = [];
  for (let p = 0; p < numParagraphs; p++) {
    const sentences = [];
    for (let i = 0; i < numSentencesPerParagraph; i++) {
      const numWords = Math.floor(Math.random() * 10) + 5;
      const sentenceWords = [];
      for (let j = 0; j < numWords; j++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        sentenceWords.push(words[randomIndex]);
      }
      const sentence = sentenceWords.join(' ') + '.';
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
    }
    paragraphs.push(sentences.join(' '));
  }
  return paragraphs.join('\n\n');
}

const generateItems = (count: number, startNumber?: number): Item[] => {
  return Array.from({length: count}, (_, index) => ({
    id: uuid.v4(),
    index: index + 1 + (startNumber ?? 0),
    content: generateRandomText(1, 2),
  }));
};

const LegendItem = ({item, isLast}: {item: Item; isLast: boolean}) => {
  return (
    <View style={styles.item}>
      <Text>Render Item {item.index}</Text>
      <View style={styles.itemText}>
        <Text>{item.content}</Text>
      </View>
      {isLast && <Text>LAST ITEM</Text>}
    </View>
  );
};

const PAGE_SIZE = 20;

const LegendListScreen = () => {
  const [items, setItems] = useState(generateItems(PAGE_SIZE * 2));
  const [loading, setLoading] = useState(false);
  const [forwardLoading, setForwardLoading] = useState(false);

  const renderItem = ({item}: {item: Item}) => (
    <LegendItem item={item} isLast={items[items.length - 1].id === item.id} />
  );

  const onStartReached = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [
        ...generateItems(PAGE_SIZE, prev[0].index - PAGE_SIZE),
        ...prev.slice(1, prev.length),
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const onEndReached = useCallback(() => {
    setForwardLoading(true);
    setTimeout(() => {
      setItems(prev => [
        ...prev.slice(0, prev.length),
        ...generateItems(PAGE_SIZE, prev[prev.length - 1].index),
      ]);
      setForwardLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        maintainVisibleContentPosition={{
          startRenderingFromBottom: true,
          autoscrollToBottomThreshold: 0.2,
        }}
        style={styles.list}
        ListHeaderComponent={loading ? <ActivityIndicator /> : null}
        ListFooterComponent={forwardLoading ? <ActivityIndicator /> : null}
        onStartReached={onStartReached}
        onEndReached={onEndReached}
        onEndReachedThreshold={-0.1}
        drawDistance={500}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          setTimeout(() => {
            setItems(prev => [
              ...prev,
              {
                id: uuid.v4(),
                index: prev[prev.length - 1].index + 1,
                content: generateRandomText(1, 2),
              },
            ]);
          }, 1000);
        }}>
        <Text>Add item</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  list: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    height: 50,
    width: '100%',
    padding: 16,
    backgroundColor: '#1192FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#F4562E',
    marginVertical: 5,
    padding: 5,
  },
  itemText: {
    padding: 5,
  },
});

export default LegendListScreen;
