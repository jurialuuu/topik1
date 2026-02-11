
import { Flashcard, GrammarPoint, PracticeQuestion } from './types';

export const VOCABULARY_DATA: Flashcard[] = [
  { id: 'v1', korean: '학교', english: 'School', category: 'Places', example: '저는 학교에 갑니다.' },
  { id: 'v9', korean: '식당', english: 'Restaurant', category: 'Places', example: '식당에서 비빔밥을 먹어요.' },
  { id: 'v13', korean: '백화점', english: 'Department Store', category: 'Places', example: '백화점에서 옷을 샀어요.' },
  { id: 'v16', korean: '도서관', english: 'Library', category: 'Places', example: '도서관에서 책을 읽어요.' },
  { id: 'v2', korean: '사과', english: 'Apple', category: 'Food', example: '시장에서 사과를 샀어요.' },
  { id: 'v17', korean: '커피', english: 'Coffee', category: 'Food', example: '카페에서 커피를 마셔요.' },
  { id: 'v3', korean: '친구', english: 'Friend', category: 'People', example: '친구가 우리 집에 왔어요.' },
  { id: 'v18', korean: '의사', english: 'Doctor', category: 'People', example: '병원의 의사가 친절해요.' },
  { id: 'v4', korean: '공부하다', english: 'To study', category: 'Actions', example: '도서관에서 한국어를 공부해요.' },
  { id: 'v11', korean: '전화하다', english: 'To call', category: 'Actions', example: '어머니께 전화했어요.' },
  { id: 'v15', korean: '기다리다', english: 'To wait', category: 'Actions', example: '여기서 친구를 기다려요.' },
  { id: 'v19', korean: '만나다', english: 'To meet', category: 'Actions', example: '주말에 친구를 만나요.' },
  { id: 'v5', korean: '맛있다', english: 'Delicious', category: 'Adjectives', example: '이 김밥은 정말 맛있어요.' },
  { id: 'v12', korean: '예쁘다', english: 'Pretty', category: 'Adjectives', example: '꽃이 정말 예뻐요.' },
  { id: 'v20', korean: '멀다', english: 'Far', category: 'Adjectives', example: '집이 학교에서 멀어요.' }
];

export const GRAMMAR_DATA: GrammarPoint[] = [
  {
    pattern: '-이/가',
    explanation: 'Subject marking particles.',
    usage: 'Added to the subject. -이 after consonants, -가 after vowels.',
    examples: [
      { korean: '가방이 무거워요.', english: 'The bag is heavy.' },
      { korean: '사과가 비싸요.', english: 'The apple is expensive.' }
    ]
  },
  {
    pattern: '-은/는',
    explanation: 'Topic marking particles.',
    usage: 'Used to indicate the topic or to show contrast.',
    examples: [
      { korean: '저는 학생입니다.', english: 'I am a student.' },
      { korean: '이 옷은 예뻐요.', english: 'As for this clothing, it is pretty.' }
    ]
  }
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // LISTENING
  {
    id: 'l1',
    type: 'listening',
    rangeKey: 'Q1 - Q4',
    content: 'Which picture matches the sentence?',
    script: '여기는 도서관입니다. 사람들이 책을 읽습니다.',
    options: ['Picture of a Park', 'Picture of a Library', 'Picture of a School', 'Picture of a Gym'],
    correctAnswer: 1,
    points: 3,
    explanation: 'The audio says "This is a library. People are reading books."',
    translation: 'This is a library. People read books.'
  },
  {
    id: 'l2',
    type: 'listening',
    rangeKey: 'Q5 - Q10',
    content: 'Choose the correct response.',
    script: '가: 안녕히 가세요. \n 나: (____)',
    options: ['안녕하세요', '반가워요', '안녕히 계세요', '잘 먹겠습니다'],
    correctAnswer: 2,
    points: 3,
    explanation: 'Response to "Go in peace" (someone leaving) is "Stay in peace" (someone staying).',
    translation: 'A: Goodbye (Go in peace). B: (____)'
  },
  {
    id: 'l3',
    type: 'listening',
    rangeKey: 'Q11 - Q14',
    content: 'Where are they?',
    script: '가: 이 구두 얼마예요? \n 나: 삼만 원입니다.',
    options: ['공항', '백화점', '은행', '병원'],
    correctAnswer: 1,
    points: 3,
    explanation: 'They are discussing the price of shoes (구두), likely at a store/department store.',
    translation: 'A: How much are these shoes? B: 30,000 won.'
  },
  {
    id: 'l4',
    type: 'listening',
    rangeKey: 'Q15 - Q30',
    content: 'What is the woman going to do?',
    script: '가: 민수 씨, 내일 같이 영화 볼까요? \n 나: 미안해요. 내일은 아르바이트가 있어요.',
    options: ['영화를 봅니다', '잠을 잡니다', '일을 합니다', '운동을 합니다'],
    correctAnswer: 2,
    points: 4,
    explanation: 'Minsu (the man) says he has "alba" (part-time job), meaning he will work.',
    translation: 'A: Minsu, shall we watch a movie together tomorrow? B: Sorry. I have a part-time job tomorrow.'
  },

  // READING
  {
    id: 'r1',
    type: 'reading',
    rangeKey: 'Q31 - Q33',
    content: '무엇입니까? \n 사과, 배, 포도',
    options: ['장소', '과일', '요일', '직업'],
    correctAnswer: 1,
    points: 2,
    explanation: 'Apples, pears, and grapes are all types of fruit (과일).',
    translation: 'What is it? Apple, Pear, Grape.'
  },
  {
    id: 'r2',
    type: 'reading',
    rangeKey: 'Q34 - Q39',
    content: '빈칸에 들어갈 말을 고르십시오. \n 오늘은 제 생일입니다. 그래서 친구에게 _____을 받았습니다.',
    options: ['선물', '편지', '인사', '숙제'],
    correctAnswer: 0,
    points: 2,
    explanation: 'It is a birthday, so "gift" (선물) is the most appropriate object.',
    translation: 'Today is my birthday. So I received a _____ from my friend.'
  },
  {
    id: 'r3',
    type: 'reading',
    rangeKey: 'Q40 - Q42',
    content: 'What does this sign mean? \n [도서관: 조용히 하십시오]',
    options: ['Do not eat food', 'Please be quiet', 'Do not run', 'No parking'],
    correctAnswer: 1,
    points: 3,
    explanation: '"조용히 하십시오" means "Please be quiet".',
    translation: 'Library: Please be quiet.'
  },
  {
    id: 'r4',
    type: 'reading',
    rangeKey: 'Q43 - Q70',
    content: 'Read the text and choose the main idea. \n 저는 요리하는 것을 좋아합니다. 그래서 주말마다 맛있는 음식을 만들어서 가족들과 같이 먹습니다. 가족들이 제 음식을 좋아합니다.',
    options: [
      '저는 가족이 많습니다.',
      '저는 요리가 즐겁습니다.',
      '저는 주말에 외식을 합니다.',
      '저는 요리사가 되고 싶습니다.'
    ],
    correctAnswer: 1,
    points: 3,
    explanation: 'The text focuses on the speaker liking to cook and enjoying the process with family.',
    translation: 'I like cooking. So every weekend I make delicious food and eat it with my family. My family likes my food.'
  }
];
