
import { Flashcard, GrammarPoint, PracticeQuestion } from './types';

export const VOCABULARY_DATA: Flashcard[] = [
  // PLACES
  { id: 'v1', korean: '학교', english: 'School', category: 'Places', example: '학교에서 한국어를 배워요.' },
  { id: 'v2', korean: '식당', english: 'Restaurant', category: 'Places', example: '이 식당은 김치찌개가 맛있어요.' },
  { id: 'v3', korean: '병원', english: 'Hospital', category: 'Places', example: '배가 아파서 병원에 갔어요.' },
  { id: 'v4', korean: '우체국', english: 'Post Office', category: 'Places', example: '우체국에서 편지를 보냅니다.' },
  { id: 'v5', korean: '공원', english: 'Park', category: 'Places', example: '날씨가 좋아서 공원에서 산책해요.' },
  { id: 'v21', korean: '도서관', english: 'Library', category: 'Places', example: '도서관에서 책을 빌렸어요.' },
  { id: 'v22', korean: '은행', english: 'Bank', category: 'Places', example: '은행에서 돈을 찾았습니다.' },
  { id: 'v23', korean: '백화점', english: 'Dept. Store', category: 'Places', example: '백화점에서 옷을 사요.' },
  { id: 'v33', korean: '약국', english: 'Pharmacy', category: 'Places', example: '약국에서 감기약을 샀어요.' },
  { id: 'v34', korean: '시장', english: 'Market', category: 'Places', example: '시장에서 과일을 샀습니다.' },
  { id: 'v60', korean: '공항', english: 'Airport', category: 'Places', example: '공항에 사람이 아주 많아요.' },
  { id: 'v61', korean: '편의점', english: 'Convenience Store', category: 'Places', example: '편의점에서 우유를 샀어요.' },
  { id: 'v62', korean: '회사', english: 'Company/Office', category: 'Places', example: '아버지는 회사에 가십니다.' },

  // FOOD & DRINK
  { id: 'v6', korean: '사과', english: 'Apple', category: 'Food', example: '시장에서 빨간 사과를 샀어요.' },
  { id: 'v7', korean: '우유', english: 'Milk', category: 'Food', example: '아침에 우유를 마십니다.' },
  { id: 'v8', korean: '물', english: 'Water', category: 'Food', example: '물을 좀 주세요.' },
  { id: 'v24', korean: '빵', english: 'Bread', category: 'Food', example: '빵집에서 맛있는 빵을 샀어요.' },
  { id: 'v25', korean: '밥', english: 'Rice/Meal', category: 'Food', example: '가족과 같이 밥을 먹어요.' },
  { id: 'v26', korean: '고기', english: 'Meat', category: 'Food', example: '저는 고기를 좋아합니다.' },
  { id: 'v35', korean: '커피', english: 'Coffee', category: 'Food', example: '카페에서 커피를 마셔요.' },
  { id: 'v36', korean: '김치', english: 'Kimchi', category: 'Food', example: '김치가 조금 매워요.' },
  { id: 'v63', korean: '냉면', english: 'Cold Noodles', category: 'Food', example: '여름에는 냉면이 최고예요.' },
  { id: 'v64', korean: '불고기', english: 'Bulgogi', category: 'Food', example: '외국 친구들이 불고기를 좋아해요.' },

  // PEOPLE & FAMILY
  { id: 'v9', korean: '친구', english: 'Friend', category: 'People', example: '주말에 친구를 만날 거예요.' },
  { id: 'v10', korean: '선생님', english: 'Teacher', category: 'People', example: '한국어 선생님이 친절해요.' },
  { id: 'v11', korean: '가족', english: 'Family', category: 'People', example: '우리 가족은 네 명이에요.' },
  { id: 'v27', korean: '부모님', english: 'Parents', category: 'People', example: '부모님께 선물을 드렸어요.' },
  { id: 'v28', korean: '동생', english: 'Younger Sibling', category: 'People', example: '동생이 노래를 잘 해요.' },
  { id: 'v37', korean: '학생', english: 'Student', category: 'People', example: '저는 한국대학교 학생입니다.' },
  { id: 'v38', korean: '의사', english: 'Doctor', category: 'People', example: '병원의 의사 선생님이 좋아요.' },
  { id: 'v65', korean: '할머니', english: 'Grandmother', category: 'People', example: '할머니 댁에 방문했어요.' },
  { id: 'v66', korean: '언니', english: 'Older Sister (Female)', category: 'People', example: '언니가 요리를 잘 해요.' },

  // TIME & DAYS
  { id: 'v39', korean: '오늘', english: 'Today', category: 'Time', example: '오늘은 날씨가 춥네요.' },
  { id: 'v40', korean: '내일', english: 'Tomorrow', category: 'Time', example: '내일 친구를 만나요.' },
  { id: 'v41', korean: '어제', english: 'Yesterday', category: 'Time', example: '어제 영화를 봤어요.' },
  { id: 'v42', korean: '지금', english: 'Now', category: 'Time', example: '지금 공부하고 있어요.' },
  { id: 'v43', korean: '아침', english: 'Morning', category: 'Time', example: '아침 일찍 일어납니다.' },
  { id: 'v44', korean: '오후', english: 'Afternoon', category: 'Time', example: '오후에 운동을 해요.' },
  { id: 'v45', korean: '주말', english: 'Weekend', category: 'Time', example: '주말에 등산을 갑니다.' },
  { id: 'v67', korean: '저녁', english: 'Evening/Dinner', category: 'Time', example: '저녁에 가족들과 밥을 먹어요.' },
  { id: 'v68', korean: '지난주', english: 'Last week', category: 'Time', example: '지난주에 여행을 다녀왔어요.' },

  // ACTIONS (VERBS)
  { id: 'v12', korean: '공부하다', english: 'To study', category: 'Actions', example: '도서관에서 시험 공부를 해요.' },
  { id: 'v13', korean: '먹다', english: 'To eat', category: 'Actions', example: '점심을 맛있게 먹었어요.' },
  { id: 'v14', korean: '자다', english: 'To sleep', category: 'Actions', example: '피곤해서 일찍 잤어요.' },
  { id: 'v15', korean: '가다', english: 'To go', category: 'Actions', example: '내일 쇼핑하러 백화점에 가요.' },
  { id: 'v29', korean: '오다', english: 'To come', category: 'Actions', example: '친구가 우리 집에 왔어요.' },
  { id: 'v30', korean: '운동하다', english: 'To exercise', category: 'Actions', example: '아침마다 운동을 해요.' },
  { id: 'v46', korean: '만나다', english: 'To meet', category: 'Actions', example: '학교에서 친구를 만나요.' },
  { id: 'v47', korean: '사다', english: 'To buy', category: 'Actions', example: '시장에서 사과를 샀어요.' },
  { id: 'v48', korean: '마시다', english: 'To drink', category: 'Actions', example: '물을 많이 마십니다.' },
  { id: 'v49', korean: '읽다', english: 'To read', category: 'Actions', example: '책을 읽는 것이 재미있어요.' },
  { id: 'v69', korean: '듣다', english: 'To listen', category: 'Actions', example: '한국 노래를 자주 들어요.' },
  { id: 'v70', korean: '말하다', english: 'To speak', category: 'Actions', example: '한국어로 천천히 말해 주세요.' },

  // ADJECTIVES
  { id: 'v16', korean: '예쁘다', english: 'Pretty', category: 'Adjectives', example: '이 옷이 참 예쁘네요.' },
  { id: 'v17', korean: '크다', english: 'Big', category: 'Adjectives', example: '우리 집은 아주 커요.' },
  { id: 'v18', korean: '작다', english: 'Small', category: 'Adjectives', example: '가방이 너무 작아요.' },
  { id: 'v19', korean: '어렵다', english: 'Difficult', category: 'Adjectives', example: '한국어 공부가 조금 어려워요.' },
  { id: 'v20', korean: '재미있다', english: 'Interesting/Fun', category: 'Adjectives', example: '이 영화는 정말 재미있어요.' },
  { id: 'v31', korean: '멀다', english: 'Far', category: 'Adjectives', example: '회사가 집에서 좀 멀어요.' },
  { id: 'v32', korean: '가깝다', english: 'Close/Near', category: 'Adjectives', example: '역이 여기서 아주 가까워요.' },
  { id: 'v50', korean: '좋다', english: 'Good', category: 'Adjectives', example: '날씨가 참 좋아요.' },
  { id: 'v51', korean: '맵다', english: 'Spicy', category: 'Adjectives', example: '음식이 조금 매워요.' },
  { id: 'v71', korean: '바쁘다', english: 'Busy', category: 'Adjectives', example: '요즘 시험 때문에 너무 바빠요.' }
];

export const GRAMMAR_DATA: GrammarPoint[] = [
  {
    pattern: '-이/가',
    explanation: 'Subject marking particles.',
    usage: 'Add -이 to nouns ending in a consonant, -가 to nouns ending in a vowel.',
    examples: [
      { korean: '책이 책상 위에 있어요.', english: 'The book is on the desk.' },
      { korean: '가방이 가벼워요.', english: 'The bag is light.' }
    ]
  },
  {
    pattern: '-은/는',
    explanation: 'Topic marking particles.',
    usage: 'Used to indicate the topic of the sentence or show contrast.',
    examples: [
      { korean: '저는 학생입니다.', english: 'I am a student.' },
      { korean: '날씨는 춥지만 마음은 따뜻해요.', english: 'The weather is cold, but my heart is warm.' }
    ]
  },
  {
    pattern: '-을/를',
    explanation: 'Object marking particles.',
    usage: 'Add -을 to objects ending in a consonant, -를 to objects ending in a vowel.',
    examples: [
      { korean: '사과를 먹어요.', english: 'I eat an apple.' },
      { korean: '물을 마셔요.', english: 'I drink water.' }
    ]
  },
  {
    pattern: '-에',
    explanation: 'Time and Place particle.',
    usage: 'Indicates the location of a static object or the direction/time of an action.',
    examples: [
      { korean: '학교에 가요.', english: 'I go to school.' },
      { korean: '아홉 시에 만나요.', english: 'Let\'s meet at 9 o\'clock.' }
    ]
  },
  {
    pattern: '-에서',
    explanation: 'Dynamic Location particle.',
    usage: 'Indicates the place where an action is happening.',
    examples: [
      { korean: '집에서 쉬어요.', english: 'I rest at home.' },
      { korean: '도서관에서 공부해요.', english: 'I study at the library.' }
    ]
  },
  {
    pattern: '-아요/어요/해요',
    explanation: 'Polite Present Tense ending.',
    usage: 'Standard ending for everyday conversations.',
    examples: [
      { korean: '가요.', english: 'I go / Let\'s go.' },
      { korean: '먹어요.', english: 'I eat.' }
    ]
  },
  {
    pattern: '-았/었/였어요',
    explanation: 'Polite Past Tense ending.',
    usage: 'Used to express completed actions in the past.',
    examples: [
      { korean: '어제 영화를 봤어요.', english: 'I watched a movie yesterday.' },
      { korean: '밥을 먹었어요.', english: 'I ate a meal.' }
    ]
  },
  {
    pattern: '-(으)ㄹ 거예요',
    explanation: 'Future Tense ending.',
    usage: 'Expresses intentions or future plans.',
    examples: [
      { korean: '내일 갈 거예요.', english: 'I will go tomorrow.' }
    ]
  },
  {
    pattern: '-고 싶다',
    explanation: 'To want to.',
    usage: 'Added to a verb stem to express desire.',
    examples: [
      { korean: '한국에 가고 싶어요.', english: 'I want to go to Korea.' }
    ]
  },
  {
    pattern: '-지 마세요',
    explanation: 'Please don\'t...',
    usage: 'Used for negative commands or requests.',
    examples: [
      { korean: '뛰지 마세요.', english: 'Please don\'t run.' },
      { korean: '잊지 마세요.', english: 'Please don\'t forget.' }
    ]
  },
  {
    pattern: '-기 때문에',
    explanation: 'Because / Since.',
    usage: 'Provides a reason for the following clause.',
    examples: [
      { korean: '비가 오기 때문에 안 가요.', english: 'Because it\'s raining, I\'m not going.' }
    ]
  }
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // EXAM SET 1
  {
    id: 'l1s1',
    type: 'listening',
    rangeKey: 'Q1 - Q4',
    examSet: 1,
    content: 'Which picture matches the sentence?',
    script: '여기는 도서관입니다. 사람들이 책을 읽습니다.',
    options: ['공원 (Park)', '도서관 (Library)', '학교 (School)', '체육관 (Gym)'],
    correctAnswer: 1,
    points: 3,
    explanation: 'The script mentions 도서관 (library) and people reading books.',
    translation: 'This is a library. People read books.'
  },
  {
    id: 'l2s1',
    type: 'listening',
    rangeKey: 'Q5 - Q10',
    examSet: 1,
    content: 'Choose the correct response.',
    script: '가: 안녕히 가세요. \n 나: (____)',
    options: ['안녕하세요', '반가워요', '안녕히 계세요', '잘 먹겠습니다'],
    correctAnswer: 2,
    points: 3,
    explanation: 'When someone leaves (안녕히 가세요), the person staying says 안녕히 계세요.',
    translation: 'A: Goodbye (Go in peace). B: (____)'
  },
  {
    id: 'l3s1',
    type: 'listening',
    rangeKey: 'Q11 - Q14',
    examSet: 1,
    content: 'Where are they?',
    script: '가: 이 구두 얼마예요? \n 나: 삼만 원입니다.',
    options: ['공항 (Airport)', '백화점 (Dept. Store)', '은행 (Bank)', '병원 (Hospital)'],
    correctAnswer: 1,
    points: 3,
    explanation: 'Discussing prices of shoes usually happens in a department store.',
    translation: 'A: How much are these shoes? B: 30,000 won.'
  },
  {
    id: 'r1s1',
    type: 'reading',
    rangeKey: 'Q31 - Q33',
    examSet: 1,
    content: '무엇에 대한 이야기입니까? \n 오이, 당근, 배추',
    options: ['채소 (Vegetables)', '과일 (Fruit)', '동물 (Animals)', '옷 (Clothes)'],
    correctAnswer: 0,
    points: 2,
    explanation: 'Cucumber, carrot, and cabbage are vegetables (채소).',
    translation: 'What is this about? Cucumber, Carrot, Cabbage.'
  },
  {
    id: 'r2s1',
    type: 'reading',
    rangeKey: 'Q34 - Q39',
    examSet: 1,
    content: '빈칸에 들어갈 말을 고르십시오. \n 오늘은 날씨가 _____요. 그래서 코트를 입었습니다.',
    options: ['더워요', '추워요', '좋아요', '밝아요'],
    correctAnswer: 1,
    points: 2,
    explanation: 'If one wears a coat, the weather must be cold (추워요).',
    translation: 'Today the weather is _____. So I wore a coat.'
  },

  // EXAM SET 2
  {
    id: 'l1s2',
    type: 'listening',
    rangeKey: 'Q1 - Q4',
    examSet: 2,
    content: 'Which picture matches the sentence?',
    script: '비가 옵니다. 사람들이 우산을 씁니다.',
    options: ['날씨가 맑음', '눈이 옴', '우산을 씀', '수영을 함'],
    correctAnswer: 2,
    points: 3,
    explanation: 'The script says it is raining (비가 옵니다) and people use umbrellas (우산을 씁니다).',
    translation: 'It is raining. People use umbrellas.'
  },
  {
    id: 'l2s2',
    type: 'listening',
    rangeKey: 'Q5 - Q10',
    examSet: 2,
    content: 'Choose the correct response.',
    script: '가: 주말에 뭐 했어요? \n 나: (____)',
    options: ['영화관에 가요', '영화를 볼 거예요', '영화를 봤어요', '영화를 보고 싶어요'],
    correctAnswer: 2,
    points: 3,
    explanation: 'The question is past tense (뭐 했어요?), so the answer must be past tense (봤어요).',
    translation: 'A: What did you do on the weekend? B: (____)'
  },
  {
    id: 'r2s2',
    type: 'reading',
    rangeKey: 'Q34 - Q39',
    examSet: 2,
    content: '빈칸에 들어갈 말을 고르십시오. \n 가: 이 구두는 얼마예요? \n 나: 오만 _____입니다.',
    options: ['원', '명', '개', '번'],
    correctAnswer: 0,
    points: 2,
    explanation: 'Prices are counted in Won (원).',
    translation: 'A: How much are these shoes? B: 50,000 _____.'
  },

  // EXAM SET 3
  {
    id: 'l1s3',
    type: 'listening',
    rangeKey: 'Q1 - Q4',
    examSet: 3,
    content: 'Which picture matches the sentence?',
    script: '바람이 많이 붑니다. 날씨가 춥습니다.',
    options: ['바람 부는 날씨', '더운 날씨', '비 오는 날씨', '눈 오는 날씨'],
    correctAnswer: 0,
    points: 3,
    explanation: 'The script says it is windy (바람이 붑니다) and cold (춥습니다).',
    translation: 'It is very windy. The weather is cold.'
  },
  {
    id: 'r1s3',
    type: 'reading',
    rangeKey: 'Q31 - Q33',
    examSet: 3,
    content: '무엇에 대한 이야기입니까? \n 봄, 여름, 가을',
    options: ['요일 (Day)', '계절 (Season)', '과일 (Fruit)', '장소 (Place)'],
    correctAnswer: 1,
    points: 2,
    explanation: 'Spring, Summer, and Fall are seasons (계절).',
    translation: 'What is this about? Spring, Summer, Fall.'
  },

  // EXAM SET 4
  {
    id: 'r4s4',
    type: 'reading',
    rangeKey: 'Q43 - Q70',
    examSet: 4,
    content: '다음의 중심 생각을 고르십시오. \n 저는 요리하는 것을 좋아합니다. 매일 집에서 맛있는 음식을 만듭니다. 가족들과 같이 먹는 것이 행복합니다.',
    options: [
      '저는 요리를 배우고 싶습니다.',
      '저는 집에서 쉬고 싶습니다.',
      '저는 요리하는 것이 즐겁습니다.',
      '저는 가족이 많습니다.'
    ],
    correctAnswer: 2,
    points: 3,
    explanation: 'The text describes enjoying cooking at home.',
    translation: 'I like cooking. Every day I make delicious food at home. Eating with my family makes me happy.'
  }
];

export const STUDY_CHECKLIST_DATA = [
  { 
    id: 'vocab1', 
    label: '1,500+ Basic Vocabulary Words', 
    category: 'Vocab',
    guide: `Focus on high-frequency nouns and verbs.
      - Places: 학교 (School), 식당 (Restaurant), 병원 (Hospital).
      - Time: 오늘 (Today), 내일 (Tomorrow), 아침 (Morning).
      - Food: 밥 (Meal), 물 (Water), 과일 (Fruit).
      - Mastery: Review 20 new words daily and use active recall.`,
    resources: [{ name: 'TOPIK Guide Vocab', url: 'https://www.topikguide.com/topik-beginner-vocabulary-list/' }]
  },
  { 
    id: 'part1', 
    label: 'Subject/Topic Particles (-이/가, -은/는)', 
    category: 'Grammar',
    guide: `Key distinction:
      - 이/가: Focuses on the SUBJECT (who/what did it).
      - 은/는: Focuses on the TOPIC or CONTRAST (speaking of... whereas...).
      - Logics: -이/가 is for new info, -은/는 for established info.`,
    resources: [{ name: 'HowToStudyKorean Lesson 1', url: 'https://www.howtostudykorean.com/unit1/unit-1-lessons-1-8/unit-1-lesson-1/' }]
  },
  { 
    id: 'tense1', 
    label: 'Past/Present/Future Tenses', 
    category: 'Grammar',
    guide: `Standard Polite Conjugation:
      - Present: -아요/어요 (가요, 먹어요)
      - Past: -았어요/었어요 (갔어요, 먹었어요)
      - Future: -(으)ㄹ 거예요 (갈 거예요, 먹을 거예요)`,
    resources: [{ name: 'Verb Tense Guide', url: 'https://90daykorean.com/korean-verb-conjugation/' }]
  },
  { 
    id: 'num1', 
    label: 'Native & Sino-Korean Numbers', 
    category: 'Essentials',
    guide: `Use Native (하나, 둘, 셋) for: Age, Hours, Counting people/items.
      Use Sino (일, 이, 삼) for: Dates, Money, Minutes, Phone numbers.
      Warning: Be careful with 1, 2, 3, 4, 20 as they change before counters (한, 두, 세, 네, 스무).`,
    resources: [{ name: 'Number Mastery', url: 'https://www.howtostudykorean.com/unit1/unit-1-lessons-9-16/lesson-10/' }]
  },
  { 
    id: 'read1', 
    label: 'Reading Strategy (Q43-Q70)', 
    category: 'Exam',
    guide: `Advanced Reading:
      - Scan for names, dates, and locations in notice boards (Q40-42).
      - For long paragraphs, read the first/last sentences to grasp the main idea.
      - Match keywords between the text and the answer choices.`,
    resources: [{ name: 'Reading Tips', url: 'https://www.topikguide.com/topik-beginner-reading-tips-strategies/' }]
  }
];

export const CHECKLIST_STUDY_RESOURCES = STUDY_CHECKLIST_DATA.reduce((acc, item) => {
  acc[item.id] = {
    title: item.label,
    guide: item.guide,
    links: item.resources
  };
  return acc;
}, {} as any);
