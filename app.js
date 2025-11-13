// Game State
let gameState = {
  numTeams: 0,
  teams: [],
  currentLevel: 1,
  currentTeamIndex: 0,
  currentQuestionIndex: 0,
  questionsPerTeam: 0,
  levelQuestions: [],
  usedQuestions: [],
  attemptCount: 0,
  currentQuestion: null,
  questionHistory: []
};

const STORAGE_KEY = '1Samuel-gameState';

// All Questions Data
const allQuestions = [
  // Level 1 - Easy Questions
  {
    level: 1,
    question: "من هي أم النبي صموئيل؟",
    options: ["راحيل", "حنة", "دبورة", "مريم"],
    correct: 1,
    verse: "1 صموئيل 1: 20",
    verseText: "وكان في مدار السنة أن حنة حبلت وولدت ابنا ودعت اسمه صموئيل قائلة: «لأني من الرب سألته»."
  },
  {
    level: 1,
    question: "من هو والد صموئيل النبي؟",
    options: ["يسى", "شاول", "ألقانة", "عالي"],
    correct: 2,
    verse: "1 صموئيل 1: 1",
    verseText: "كان رجل من رامتايم صوفيم من جبل أفرايم اسمه ألقانة بن يروحام بن أليهو بن توحو بن صوف. هو أفرايمي"
  },
  {
    level: 1,
    question: "كم عدد زوجات ألقانة والد صموئيل؟",
    options: ["واحدة", "اثنتان", "ثلاث", "أربع"],
    correct: 1,
    verse: "1 صموئيل 1: 2",
    verseText: "وله امرأتان، اسم الواحدة حنة، واسم الأخرى فننة. وكان لفننة أولاد، وأما حنة فلم يكن لها أولاد."
  },
  {
    level: 1,
    question: "من كان الكاهن في شيلوه عندما صلت حنة؟",
    options: ["صموئيل", "عالي", "ناثان", "صادوق"],
    correct: 1,
    verse: "1 صموئيل 1: 9",
    verseText: "فقامت حنة بعدما أكلوا في شيلوه وبعدما شربوا، وعالي الكاهن جالس على الكرسي عند قائمة هيكل الرب"
  },
  {
    level: 1,
    question: "من هو أول ملك لإسرائيل؟",
    options: ["داود", "سليمان", "شاول", "يوناثان"],
    correct: 2,
    verse: "1 صموئيل 10: 24",
    verseText: "فقال صموئيل لجميع الشعب: «أرأيتم الذي اختاره الرب، أنه ليس مثله في جميع الشعب؟» فهتف كل الشعب وقالوا: «ليحي الملك!»"
  },
  {
    level: 1,
    question: "من قتل جليات الجبار؟",
    options: ["شاول", "يوناثان", "داود", "صموئيل"],
    correct: 2,
    verse: "1 صموئيل 17: 50",
    verseText: "فتمكن داود من الفلسطيني بالمقلاع والحجر، وضرب الفلسطيني وقتله. ولم يكن سيف بيد داود."
  },
  {
    level: 1,
    question: "من أي سبط كان شاول الملك؟",
    options: ["يهوذا", "بنيامين", "أفرايم", "لاوي"],
    correct: 1,
    verse: "1 صموئيل 9: 1-2",
    verseText: "وكان رجل من بنيامين اسمه قيس بن أبيئيل بن صرور بن بكورة بن أفيح، ابن رجل بنياميني جبار بأس. وكان له ابن اسمه شاول"
  },
  {
    level: 1,
    question: "كم حجراً اختار داود لمواجهة جليات؟",
    options: ["ثلاثة", "أربعة", "خمسة", "سبعة"],
    correct: 2,
    verse: "1 صموئيل 17: 40",
    verseText: " وأخذ عصاه بيده، وانتخب له خمسة حجارة ملس من الوادي وجعلها في كنف الرعاة الذي له"
  },
  {
    level: 1,
    question: "من كان ابن عالي الكاهن الذي مات في المعركة مع الفلسطينيين؟",
    options: ["حفني وفينحاس", "قايين وهابيل", "يعقوب وعيسو", "موسى وهارون"],
    correct: 0,
    verse: "1 صموئيل 4: 11",
    verseText: "وأخذ تابوت الله، ومات ابنا عالي حفني وفينحاس"
  },
  {
    level: 1,
    question: "ما اسم صديق داود ابن شاول؟",
    options: ["أبشالوم", "يوناثان", "أدونيا", "أمنون"],
    correct: 1,
    verse: "1 صموئيل 18: 1",
    verseText: " وكان لما فرغ من الكلام مع شاول أن نفس يوناثان تعلقت بنفس داود، وأحبه يوناثان كنفس"
  },
  {
    level: 1,
    question: "إلى أين أخذ الفلسطينيون تابوت العهد بعد الاستيلاء عليه؟",
    options: ["أشدود", "بابل", "مصر", "دمشق"],
    correct: 0,
    verse: "1 صموئيل 5: 1",
    verseText: "فأخذ الفلسطينيون تابوت الله وأتوا به من حجر المعونة إلى أشدود."
  },
  {
    level: 1,
    question: "من مسح داود ملكاً على إسرائيل؟",
    options: ["عالي", "ناثان", "صموئيل", "شاول"],
    correct: 2,
    verse: "1 صموئيل 16: 13",
    verseText: " فأخذ صموئيل قرن الدهن ومسحه في وسط إخوته. وحل روح الرب على داود من ذلك اليوم فصاعدا"
  },
  {
    level: 1,
    question: "كم كان عمر صموئيل تقريباً عندما دعاه الله؟",
    options: ["شيخ", "صبي صغير", "شاب", "رضيع"],
    correct: 1,
    verse: "1 صموئيل 3: 1",
    verseText: "وكان الصبي صموئيل يخدم الرب أمام عالي"
  },
  {
    level: 1,
    question: "ماذا كان داود يفعل عندما أرسل صموئيل لمسحه؟",
    options: ["يحارب", "يصلي", "يرعى الغنم", "يدرس"],
    correct: 2,
    verse: "1 صموئيل 16: 11",
    verseText: " وقال صموئيل ليسى: «هل كملوا الغلمان؟» فقال: «بقي بعد الصغير وهوذا يرعى الغنم»"
  },
  {
    level: 1,
    question: "من كانت زوجة داود ابنة شاول؟",
    options: ["راحيل", "ميكال", "أبيجايل", "بثشبع"],
    correct: 1,
    verse: "1 صموئيل 18: 27",
    verseText: " حتى قام داود وذهب هو ورجاله وقتل من الفلسطينيين مئتي رجل، وأتى داود بغلفهم فأكملوها للملك لمصاهرة الملك. فأعطاه شاول ميكال ابنته امرأة"
  },
  {
    level: 1,
    question: "كم كان عدد إخوة داود الأكبر منه؟",
    options: ["خمسة", "ستة", "سبعة", "ثمانية"],
    correct: 2,
    verse: "1 صموئيل 16: 10",
    verseText: "عبر يسى بنيه السبعة أمام صموئيل، فقال صموئيل ليسى: «الرب لم يختر هؤلاء»"
  },
  {
    level: 1,
    question: "ماذا كانت مهنة داود قبل أن يصبح ملكاً؟",
    options: ["صياد", "نجار", "راعي غنم", "جندي"],
    correct: 2,
    verse: "1 صموئيل 16: 11",
    verseText: "وقال صموئيل ليسى: «هل كملوا الغلمان؟» فقال: «بقي بعد الصغير وهوذا يرعى الغنم»"
  },
  {
    level: 1,
    question: "في أي مدينة كان بيت عالي الكاهن؟",
    options: ["أورشليم", "بيت لحم", "شيلوه", "الخليل"],
    correct: 2,
    verse: "1 صموئيل 1: 3",
    verseText: " وكان هذا الرجل يصعد من مدينته من سنة إلى سنة ليسجد ويذبح لرب الجنود في شيلوه"
  },
  {
    level: 1,
    question: "من هو والد داود؟",
    options: ["شاول", "يسى", "صموئيل", "عالي"],
    correct: 1,
    verse: "1 صموئيل 16: 1",
    verseText: " فقال الرب لصموئيل: «حتى متى تنوح على شاول، وأنا قد رفضته عن أن يملك على إسرائيل؟ املأ قرنك دهنا وتعال أرسلك إلى يسى البيتلحمي، لأني قد رأيت لي في بنيه ملكا»."
  },
  {
    level: 1,
    question: "كيف مات شاول الملك؟",
    options: ["قتله داود", "قتله الفلسطينيون", "سقط على سيفه (انتحر)", "مات مرضاً"],
    correct: 2,
    verse: "1 صموئيل 31: 4",
    verseText: " فقال شاول لحامل سلاحه: «استل سيفك واطعني به لئلا يأتي هؤلاء الغلف ويطعنوني ويقبحوني». فلم يشأ حامل سلاحه لأنه خاف جدا. فأخذ شاول السيف وسقط عليه"
  },
  // Level 2 - Medium Questions
  {
    level: 2,
    question: "ماذا كان اسم الزوجة الثانية لألقانة التي كانت تغيظ حنة؟",
    options: ["فننة", "راحيل", "ليئة", "سارة"],
    correct: 0,
    verse: "1 صموئيل 1: 2",
    verseText: "وله امرأتان، اسم الواحدة حنة، واسم الأخرى فننة. وكان لفننة أولاد، وأما حنة فلم يكن لها أولاد"
  },
  {
    level: 2,
    question: "ماذا ظن عالي عن حنة عندما رآها تصلي في الهيكل؟",
    options: ["أنها مريضة", "أنها سكرانة", "أنها نبية", "أنها حزينة"],
    correct: 1,
    verse: "1 صموئيل 1: 13-14",
    verseText: "فإن حنة كانت تتكلم في قلبها، وشفتاها فقط تتحركان، وصوتها لم يسمع، أن عالي ظنها سكرى."
  },
  {
    level: 2,
    question: "كم مرة دعا الرب صموئيل في الليل؟",
    options: ["مرتين", "ثلاث مرات", "أربع مرات", "خمس مرات"],
    correct: 2,
    verse: "1 صموئيل 3: 8",
    verseText: "وعاد الرب فدعا صموئيل ثالثة…… فجاء الرب ووقف ودعا كالمرات الأول: «صموئيل، صموئيل». فقال صموئيل: «تكلم لأن عبدك سامع»'"
  },
  {
    level: 2,
    question: "ما اسم إله الفلسطينيين الذي سقط تمثاله أمام تابوت العهد؟",
    options: ["بعل", "داجون", "مولك", "عشتاروث"],
    correct: 1,
    verse: "1 صموئيل 5: 3-4",
    verseText: "وبكر الأشدوديون في الغد وإذا بداجون ساقط على وجهه إلى الأرض أمام تابوت الرب"
  },
  {
    level: 2,
    question: "كم سنة بقي تابوت العهد في قرية يعاريم؟",
    options: ["سبع سنوات", "عشرين سنة", "أربعين سنة", "ثلاث سنوات"],
    correct: 1,
    verse: "1 صموئيل 7: 2",
    verseText: "وكان من يوم جلوس التابوت في قرية يعاريم أن المدة طالت وكانت عشرين سنة"
  },
  {
    level: 2,
    question: "ماذا قدم الفلسطينيون مع تابوت العهد عند إرجاعه؟",
    options: ["ذهب وفضة", "قرابين ذهبية على شكل بواسير وفئران", "ماشية ومحاصيل", "عبيد وجواري"],
    correct: 1,
    verse: "1 صموئيل 6: 4-5",
    verseText: " واصنعوا تماثيل بواسيركم وتماثيل فيرانكم التي تفسد الأرض، وأعطوا إله إسرائيل مجدا لعله يخفف يده عنكم وعن آلهتكم وعن أرضكم"
  },
  {
    level: 2,
    question: "ما طول جليات الجبار بالذراع؟",
    options: ["أربعة أذرع وشبر", "ستة أذرع وشبر", "ثمانية أذرع وشبر", "عشرة أذرع وشبر"],
    correct: 1,
    verse: "1 صموئيل 17: 4",
	verseText: " فخرج رجل مبارز من جيوش الفلسطينيين اسمه جليات، من جت، طوله ست أذرع وشبر"
  },
  {
    level: 2,
    question: "ماذا كان وزن رمح جليات الحديدي؟",
    options: ["مئة شاقل", "ثلاثمئة شاقل", "ستمئة شاقل", "ألف شاقل"],
    correct: 2,
    verse: "1 صموئيل 17: 7",
	verseText: " وقناة رمحه كنول النساجين، وسنان رمحه ست مئة شاقل حديد"
  },
  {
    level: 2,
    question: "ماذا أعطى شاول لداود كمكافأة لقتل جليات؟",
    options: ["ذهباً وفضة", "ابنته ميكال زوجة", "أرضاً ومواشي", "سيفاً وتاجاً"],
    correct: 1,
    verse: "1 صموئيل 18: 27",
	verseText: " فأعطاه شاول ميكال ابنته امرأة"
  },
  {
    level: 2,
    question: "كم رأس غلفة (قلفة) طلب شاول من داود كمهر لابنته؟",
    options: ["خمسين", "مئة", "مئتين", "ثلاثمئة"],
    correct: 1,
    verse: "1 صموئيل 18: 25",
	verseText: " فقال شاول: «هكذا تقولون لداود: ليست مسرة الملك بالمهر، بل بمئة غلفة من الفلسطينيين للانتقام من أعداء الملك»"
  },
  {
    level: 2,
    question: "ماذا كان اسم الحجر الذي نصبه صموئيل بعد النصرة على الفلسطينيين؟",
    options: ["حجر الشهادة", "حجر المعونة", "حجر النصر", "حجر التذكار"],
    correct: 1,
    verse: "1 صموئيل 7: 12",
	verseText: " فأخذ صموئيل حجرا ونصبه بين المصفاة والسن، ودعا اسمه «حجر المعونة» وقال: «إلى هنا أعاننا الرب»"
  },
  {
    level: 2,
    question: "ما اسم المرأة صاحبة الجان التي استحضرت روح صموئيل لشاول؟",
    options: ["عرافة أورشليم", "عرافة عين دور", "عرافة بيت لحم", "عرافة شيلوه"],
    correct: 1,
    verse: "1 صموئيل 28: 7",
	verseText: " فقال شاول لعبيده: «فتشوا لي على امرأة صاحبة جان، فأذهب إليها وأسألها». فقال له عبيده: «هوذا امرأة صاحبة جان في عين دور»"
  },
  {
    level: 2,
    question: "من كان القائد العام لجيش شاول؟",
    options: ["يوآب", "أبنير", "يوناثان", "داود"],
    correct: 1,
    verse: "1 صموئيل 14: 50",
	verseText: "واسم رئيس جيشه أبينير بن نير عم شاول"
  },
  {
    level: 2,
    question: "ما اسم المدينة التي رفض أهلها إعطاء داود طعاماً عندما كان هارباً؟",
    options: ["نوب", "الكرمل", "صقلغ", "جت"],
    correct: 1,
    verse: "1 صموئيل 25: 2-3",
	verseText: " وكان رجل في معون، وأملاكه في الكرمل، وكان الرجل عظيما جدا وله ثلاثة آلاف من الغنم وألف من المعز، وكان يجز غنمه في الكرمل"
  },
  {
    level: 2,
    question: "ما اسم زوج أبيجايل قبل أن تتزوج داود؟",
    options: ["نابال", "أوريا", "حانون", "أخيش"],
    correct: 0,
    verse: "1 صموئيل 25: 3",
	verseText: "واسم الرجل نابال واسم امرأته أبيجايل"
  },
  {
    level: 2,
    question: "كم سنة قضى شاول في الملك؟",
    options: ["عشرين سنة", "ثلاثين سنة", "أربعين سنة", "خمسين سنة"],
    correct: 2,
    verse: "أعمال الرسل 13: 21",
	verseText: "ومن ثم طلبوا ملكا، فأعطاهم الله شاول بن قيس، رجلا من سبط بنيامين، أربعين سنة"
  },
  {
    level: 2,
    question: "ماذا كان اسم المدينة الفلسطينية التي لجأ إليها داود؟",
    options: ["غزة", "جت", "أشدود", "عسقلان"],
    correct: 1,
    verse: "1 صموئيل 27: 2",
	verseText: "فقام داود وعبر هو والست مئة الرجل الذين معه، إلى …. ملك جت"
  },
  {
    level: 2,
    question: "من كان ملك جت الذي لجأ إليه داود؟",
    options: ["أخيش", "جليات", "أبيمالك", "أدونيا"],
    correct: 0,
    verse: "1 صموئيل 27: 2",
	verseText: "فقام داود وعبر هو والست مئة الرجل الذين معه، إلى أخيش بن معوك ملك جت"
  },
  {
    level: 2,
    question: "في أي معركة مات شاول وأبناؤه؟",
    options: ["معركة مجدو", "معركة جلبوع", "معركة عين جدي", "معركة وادي إيلة"],
    correct: 1,
    verse: "1 صموئيل 31: 1",
	verseText: "وحارب الفلسطينيون إسرائيل، فهرب رجال إسرائيل من أمام الفلسطينيين وسقطوا قتلى في جبل جلبوع"
  },
  {
    level: 2,
    question: "كم ابناً لشاول ماتوا معه في المعركة؟",
    options: ["واحد", "اثنان", "ثلاثة", "أربعة"],
    correct: 2,
    verse: "1 صموئيل 31: 2",
	verseText: "فشد الفلسطينيون وراء شاول وبنيه، وضرب الفلسطينيون يوناثان وأبيناداب وملكيشوع أبناء شاول"
  },
  // Level 3 - Hard Questions
  {
    level: 3,
    question: "من أي عشيرة كان ألقانة والد صموئيل؟",
    options: ["الصوفي", "القورحي", "الرامي", "العزيري"],
    correct: 0,
    verse: "1 صموئيل 1: 1",
	verseText: "كان رجل من رامتايم صوفيم من جبل أفرايم اسمه ألقانة بن يروحام بن أليهو بن توحو بن صوف. هو أفرايمي"
  },
  {
    level: 3,
    question: "ماذا كان عمر عالي الكاهن عندما مات؟",
    options: ["ثمانين سنة", "تسعين سنة", "ثمانية وتسعين سنة", "مئة سنة"],
    correct: 2,
    verse: "1 صموئيل 4: 15",
	verseText: "وكان عالي ابن ثمان وتسعين سنة، وقامت عيناه ولم يقدر أن يبصر"
  },
  {
    level: 3,
    question: "كم سنة قضى عالي قاضياً لإسرائيل؟",
    options: ["عشرين سنة", "ثلاثين سنة", "أربعين سنة", "خمسين سنة"],
    correct: 2,
    verse: "1 صموئيل 4: 18",
	verseText: " وكان لما ذكر تابوت الله، أنه سقط عن الكرسي إلى الوراء إلى جانب الباب، فانكسرت رقبته ومات، لأنه كان رجلا شيخا وثقيلا. وقد قضى لإسرائيل أربعين سنة"
  },
  {
    level: 3,
    question: "ماذا كان اسم امرأة فينحاس التي ماتت عند ولادتها بعد سماع خبر موت زوجها؟",
    options: ["مريم", "لم يُذكر اسمها", "حنة", "دبورة"],
    correct: 1,
    verse: "1 صموئيل 4: 19",
	verseText: "وكنته امرأة فينحاس كانت حبلى تكاد تلد. فلما سمعت خبر أخذ تابوت الله وموت حميها ورجلها، ركعت وولدت، لأن مخاضها انقلب عليها"
  },
  {
    level: 3,
    question: "ماذا أسمت امرأة فينحاس ابنها الذي ولدته قبل موتها؟",
    options: ["فينحاس ", "إيخابود", "عزيا", "يشوع"],
    correct: 1,
    verse: "1 صموئيل 4: 21",
	verseText: "فدعت الصبي «إيخابود» قائلة: «قد زال المجد من إسرائيل»"
  },
  {
    level: 3,
    question: "كم بقرة أرجعت تابوت العهد من أرض الفلسطينيين؟",
    options: ["بقرتان", "ثلاث بقرات", "أربع بقرات", "خمس بقرات"],
    correct: 0,
    verse: "1 صموئيل 6: 7",
	verseText: " فالآن خذوا واعملوا عجلة واحدة جديدة وبقرتين مرضعتين لم يعلهما نير، واربطوا البقرتين إلى العجلة"
  },
  {
    level: 3,
    question: "كم رجلاً من بيت شمس ضربهم الرب لأنهم نظروا إلى تابوت الرب؟",
    options: ["ثلاثين ألف وثمانين رجلاً", "خمسون ألف وسبعون رجلاً", "مئة ألف وستين رجلاً", "مئة وعشرون ألف رجلاً"],
    correct: 1,
    verse: "1 صموئيل 6: 19",
	verseText: "وضرب أهل بيتشمس لأنهم نظروا إلى تابوت الرب. وضرب من الشعب خمسين ألف رجل وسبعين رجلا"
  },
  {
    level: 3,
    question: "ما اسم ابني صموئيل اللذان جعلهما قضاة؟",
    options: ["أمنون وابشالوم", "يوئيل وأبيا", "يشوع وحزقيا", "أبيهو ويؤاب"],
    correct: 1,
    verse: "1 صموئيل 8: 2",
	verseText: "وكان اسم ابنه البكر يوئيل، واسم ثانيه أبيا"
  },
  {
    level: 3,
    question: "في أي مدينة كان ابنا صموئيل يقضيان؟",
    options: ["شيلوه", "بئر سبع", "أورشليم", "الرامة"],
    correct: 1,
    verse: "1 صموئيل 8: 2",
	verseText: "وكان اسم ابنه البكر يوئيل، واسم ثانيه أبيا. كانا قاضيين في بئر سبع"
  },
  {
    level: 3,
    question: "ما اسم والد شاول؟",
    options: ["قيس", "بنيامين", "عالي", "يشوع"],
    correct: 0,
    verse: "1 صموئيل 9: 1",
	verseText: "وكان رجل من بنيامين اسمه قيس بن أبيئيل بن صرور بن بكورة بن أفيح"
  },
  {
    level: 3,
    question: "ماذا كان شاول يبحث عنه عندما التقى بصموئيل لأول مرة؟",
    options: ["غنم والده", "أتن والده", "بقر والده", "جمال والده"],
    correct: 1,
    verse: "1 صموئيل 9: 3",
	verseText: "فضلت أتن قيس أبي شاول. فقال قيس لشاول ابنه: «خذ معك واحدا من الغلمان وقم اذهب فتش على الأتن»"
  },
  {
    level: 3,
    question: "ما اسم الغلام الذي كان مع شاول في رحلته؟",
    options: ["لم يُذكر اسمه", "أفيح", "منسى", "أبيئيل"],
    correct: 0,
    verse: "1 صموئيل 9: 5",
	verseText: " ولما دخلا أرض صوف قال شاول لغلامه الذي معه: «تعال نرجع لئلا يترك أبي الأتن ويهتم بنا»"
  },
  {
    level: 3,
    question: "في أي مكان مسح صموئيل داود خفية؟",
    options: ["في شيلوه", "في أورشليم", "في بيت لحم وسط إخوته", "في الرامة"],
    correct: 2,
    verse: "1 صموئيل 16: 13",
	verseText: " فأخذ صموئيل قرن الدهن ومسحه في وسط إخوته. وحل روح الرب على داود من ذلك اليوم فصاعدا"
  },
  {
    level: 3,
    question: "ما اسم الملك الذي أمر الرب شاول أن يُحرِّمه ولم يطع؟",
    options: ["أجاج ملك عماليق", "فرعون ملك مصر", "نبوخذنصر ملك بابل", "أخيش ملك جت"],
    correct: 0,
    verse: "1 صموئيل 15: 8",
	verseText: "وأمسك أجاج ملك عماليق حيا، وحرم جميع الشعب بحد السيف"
  },
  {
    level: 3,
    question: "ماذا كان اسم أخ داود الأكبر الذي وبخه عند مجيئه للمعركة؟",
    options: ["أبيناداب", "شمة", "أليآب", "ناثان"],
    correct: 2,
    verse: "1 صموئيل 17: 28",
	verseText: " وسمع أخوه الأكبر أليآب كلامه مع الرجال، فحمي غضب أليآب على داود"
  },
  {
    level: 3,
    question: "كم يوماً خرج جليات يعيّر صفوف إسرائيل قبل أن يقتله داود؟",
    options: ["سبعة أيام", "عشرة أيام", "ثلاثين يوماً", "أربعين يوماً"],
    correct: 3,
    verse: "1 صموئيل 17: 16",
	verseText: " وكان الفلسطيني يتقدم ويقف صباحا ومساء أربعين يوما"
  },
  {
    level: 3,
    question: "ماذا حمل داود إلى إخوته الثلاثة في المعركة؟",
    options: ["ماءً وخبزاً", "إيفة من الفريك وعشر خبزات", "لحماً وخمراً", "عسلاً وسمناً"],
    correct: 1,
    verse: "1 صموئيل 17: 17",
	verseText: " فقال يسى لداود ابنه: «خذ لإخوتك إيفة من هذا الفريك، وهذه العشر الخبزات واركض إلى المحلة إلى إخوتك"
  },
  {
    level: 3,
    question: "ما اسم ابنة شاول الكبرى التي وُعد بها داود أولاً؟",
    options: ["ميكال", "ميرب", "تامار", "أبيجايل"],
    correct: 1,
    verse: "1 صموئيل 18: 17",
	verseText: "وقال شاول لداود: «هوذا ابنتي الكبيرة ميرب أعطيك إياها امرأة. إنما كن لي ذا بأس وحارب حروب الرب»"
  },
  {
    level: 3,
    question: "كم رجلاً كان مع داود عندما كان هارباً من شاول في البرية؟",
    options: ["مئتا رجل", "ثلاثمئة رجل", "أربعمئة رجل", "ستمئة رجل"],
    correct: 3,
    verse: "1 صموئيل 23: 13",
	verseText: " فقام داود ورجاله، نحو ست مئة رجل، وخرجوا من قعيلة وذهبوا حيثما ذهبوا"
  },
  {
    level: 3,
    question: "في أي مكان قطع داود طرف جبة شاول خلسة؟",
    options: ["في مغارة عين جدي", "في برية معون", "في غابة حارث", "في نوب"],
    correct: 0,
    verse: "1 صموئيل 24: 4",
	verseText: "ولما رجع شاول من وراء الفلسطينيين أخبروه قائلين: «هوذا داود في برية عين جدي»"
  }
];

// Check for saved game on load
window.addEventListener('DOMContentLoaded', () => {
  checkForSavedGame();
  setupKeyboardControls();
});

function checkForSavedGame() {
  const savedGame = loadGameState();
  if (savedGame && savedGame.numTeams > 0) {
    document.getElementById('resumeOptions').classList.remove('hidden');
    document.getElementById('newGameForm').classList.add('hidden');
  }
}

function resumeGame() {
  const savedGame = loadGameState();
  if (savedGame) {
    gameState = savedGame;
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('appHeader').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'block';
    updateScoreboard();
    updateProgressBar();
    loadQuestion();
  }
}

function clearSavedGame() {
  if (confirm('هل أنت متأكد من بدء لعبة جديدة؟ سيتم حذف التقدم المحفوظ.')) {
    clearStorage();
    document.getElementById('resumeOptions').classList.add('hidden');
    document.getElementById('newGameForm').classList.remove('hidden');
  }
}

function saveGameState() {
  try {
    const stateToSave = JSON.stringify(gameState);
    // Use in-memory storage since localStorage is blocked
    window.gameStateBackup = stateToSave;
  } catch (e) {
    console.log('Cannot save to localStorage (sandboxed environment)');
  }
}

function loadGameState() {
  try {
    const saved = window.gameStateBackup;
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

function clearStorage() {
  window.gameStateBackup = null;
}

function setupKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('gameScreen').classList.contains('hidden')) return;
    
    if (e.key >= '1' && e.key <= '4') {
      const index = parseInt(e.key) - 1;
      const buttons = document.querySelectorAll('.option-btn');
      if (buttons[index] && !buttons[index].disabled) {
        buttons[index].click();
      }
    } else if (e.key === 'Enter') {
      const nextBtn = document.getElementById('nextBtn');
      if (!nextBtn.classList.contains('hidden')) {
        nextBtn.click();
      }
    } else if (e.key === 'Escape') {
      goBack();
    } else if (e.key === 'r' || e.key === 'R') {
      resetGame();
    }
  });
}

function goBack() {
  if (gameState.questionHistory.length === 0) {
    if (confirm('هل تريد العودة إلى البداية؟')) {
      resetGame();
    }
    return;
  }
  
  if (confirm('هل تريد العودة للسؤال السابق؟ سيتم العودة لآخر حفظ.')) {
    const lastState = gameState.questionHistory.pop();
    gameState.currentTeamIndex = lastState.teamIndex;
    gameState.usedQuestions.pop();
    updateScoreboard();
    updateProgressBar();
    loadQuestion();
    saveGameState();
  }
}

function resetGame() {
  if (confirm('هل تريد بدء لعبة جديدة؟ سيتم حذف كل التقدم.')) {
    clearStorage();
    location.reload();
  }
}

function updateProgressBar() {
  const totalQuestions = gameState.questionsPerTeam * gameState.numTeams;
  const currentQuestion = gameState.usedQuestions.length;
  const percentage = (currentQuestion / totalQuestions) * 100;
  
  document.getElementById('progressFill').style.width = percentage + '%';
  document.getElementById('progressText').textContent = `السؤال ${currentQuestion} من ${totalQuestions}`;
  document.getElementById('levelProgress').textContent = `المستوى ${gameState.currentLevel}/3`;
}

// Initialize Game
function startGame() {
  const teamCount = parseInt(document.getElementById('teamCount').value);
  
  if (teamCount < 2 || teamCount > 6) {
    alert('الرجاء إدخال عدد فرق بين 2 و 6');
    return;
  }
  
  // Initialize teams
  gameState.numTeams = teamCount;
  gameState.teams = [];
  for (let i = 0; i < teamCount; i++) {
    gameState.teams.push({
      name: `الفريق ${i + 1}`,
      score: 0
    });
  }
  
  // Calculate questions per team (20 questions per level divided by teams)
  gameState.questionsPerTeam = Math.floor(20 / teamCount);
  
  // Start Level 1
  gameState.currentLevel = 1;
  gameState.currentTeamIndex = 0;
  gameState.currentQuestionIndex = 0;
  
  // Prepare level questions
  prepareLevelQuestions();
  
  // Show game screen
  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  
  // Update UI
  document.getElementById('appHeader').style.display = 'flex';
  document.getElementById('backBtn').style.display = 'block';
  document.getElementById('resetBtn').style.display = 'block';
  updateScoreboard();
  updateProgressBar();
  loadQuestion();
  saveGameState();
}

// Prepare questions for current level
function prepareLevelQuestions() {
  const levelQuestions = allQuestions.filter(q => q.level === gameState.currentLevel);
  // Shuffle questions
  gameState.levelQuestions = shuffleArray([...levelQuestions]);
  gameState.usedQuestions = [];
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Update Scoreboard
function updateScoreboard() {
  const levelNames = ['', 'المستوى الأول - أسئلة سهلة', 'المستوى الثاني - أسئلة صعبة', 'المستوى الثالث - أسئلة صعبة جداً'];
  const levelIndicator = document.getElementById('levelIndicator');
  levelIndicator.textContent = levelNames[gameState.currentLevel];
  levelIndicator.className = `level-indicator level-${gameState.currentLevel}`;
  
  const teamsScores = document.getElementById('teamsScores');
  teamsScores.innerHTML = '';
  
  gameState.teams.forEach((team, index) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team-score';
    if (index === gameState.currentTeamIndex) {
      teamDiv.classList.add('active');
    }
    teamDiv.innerHTML = `
      <strong>${team.name}</strong>
      <span>${team.score} نقطة</span>
    `;
    teamsScores.appendChild(teamDiv);
  });
}

// Load Question
function loadQuestion() {
  if (gameState.usedQuestions.length >= gameState.levelQuestions.length) {
    // Level completed
    if (gameState.currentLevel < 3) {
      showLevelComplete();
      return;
    } else {
      showWinner();
      return;
    }
  }
  
  // Get next unused question
  let questionIndex;
  do {
    questionIndex = Math.floor(Math.random() * gameState.levelQuestions.length);
  } while (gameState.usedQuestions.includes(questionIndex));
  
  gameState.usedQuestions.push(questionIndex);
  gameState.currentQuestion = gameState.levelQuestions[questionIndex];
  gameState.attemptCount = 0;
  
  // Save question history for back button
  gameState.questionHistory.push({
    teamIndex: gameState.currentTeamIndex,
    questionIndex: questionIndex
  });
  
  // Calculate total questions for current team in this level
  const totalQuestionsThisLevel = gameState.questionsPerTeam * gameState.numTeams;
  const currentQuestionNum = gameState.usedQuestions.length;
  
  // Update UI
  document.getElementById('currentTeam').textContent = gameState.teams[gameState.currentTeamIndex].name;
  document.getElementById('questionNumber').textContent = `السؤال ${currentQuestionNum} من ${totalQuestionsThisLevel}`;
  document.getElementById('questionText').textContent = gameState.currentQuestion.question;
  
  // Clear feedback
  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('nextBtn').classList.add('hidden');
  
  // Display options
  displayOptions();
}

// Display Options
function displayOptions() {
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  
  gameState.currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

// Check Answer
function checkAnswer(selectedIndex) {
  gameState.attemptCount++;
  
  const correctIndex = gameState.currentQuestion.correct;
  const isCorrect = selectedIndex === correctIndex;
  
  // Disable all buttons
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  if (isCorrect) {
    // Correct answer
    buttons[selectedIndex].classList.add('correct');
    buttons[selectedIndex].parentElement.classList.add('fade-in');
    
    // Calculate points
    let points = 0;
    if (gameState.currentLevel === 1) {
      points = gameState.attemptCount === 1 ? 3 : 1;
    } else if (gameState.currentLevel === 2) {
      points = gameState.attemptCount === 1 ? 5 : 3;
    } else if (gameState.currentLevel === 3) {
      points = gameState.attemptCount === 1 ? 7 : 5;
    }
    
    gameState.teams[gameState.currentTeamIndex].score += points;
    
    // Show feedback
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback success';
    feedback.innerHTML = `
      <h3>✅ إجابة صحيحة!</h3>
      <p>حصلت على ${points} نقطة</p>
      <div class="verse-box">
        <div class="verse-reference">${gameState.currentQuestion.verse}</div>
        <div class="verse-text">${gameState.currentQuestion.verseText || 'الشاهد غير متوفر'}</div>
      </div>
    `;
    feedback.classList.remove('hidden');
    
    // Update scoreboard with animation
    updateScoreboard();
    
    // Save state after answer
    saveGameState();
    
    // Show next button
    document.getElementById('nextBtn').classList.remove('hidden');
  } else {
    // Wrong answer
    buttons[selectedIndex].classList.add('wrong');
    
    if (gameState.attemptCount === 1) {
      // First attempt - allow second try
      const feedback = document.getElementById('feedback');
      feedback.className = 'feedback info';
      feedback.innerHTML = `
        <h3>❌ إجابة خاطئة!</h3>
        <p>محاولة ثانية - نقاط أقل!</p>
      `;
      feedback.classList.remove('hidden');
      
      // Re-enable correct answer button
      setTimeout(() => {
        buttons.forEach((btn, idx) => {
          if (idx !== selectedIndex) {
            btn.disabled = false;
          }
        });
      }, 1500);
    } else {
      // Second attempt - show correct answer
      buttons[correctIndex].classList.add('correct');
      
      const feedback = document.getElementById('feedback');
      feedback.className = 'feedback error';
      feedback.innerHTML = `
        <h3>❌ إجابة خاطئة!</h3>
        <p>الإجابة الصحيحة: ${gameState.currentQuestion.options[correctIndex]}</p>
     
		<div class="verse-box">
        <div class="verse-reference">${gameState.currentQuestion.verse}</div>
        <div class="verse-text">${gameState.currentQuestion.verseText || 'الشاهد غير متوفر'}</div>
      </div>
	  
	  
      `;
      feedback.classList.remove('hidden');
      
      // Show next button
      document.getElementById('nextBtn').classList.remove('hidden');
    }
  }
}

// Add score animation
function animateScore(teamIndex) {
  const teamScores = document.querySelectorAll('.team-score');
  if (teamScores[teamIndex]) {
    teamScores[teamIndex].classList.add('score-update');
    setTimeout(() => {
      teamScores[teamIndex].classList.remove('score-update');
    }, 600);
  }
}

// Next Question
function nextQuestion() {
  // Move to next team
  gameState.currentTeamIndex = (gameState.currentTeamIndex + 1) % gameState.numTeams;
  gameState.currentQuestionIndex++;
  
  // Save state
  saveGameState();
  updateProgressBar();
  
  // Check if all teams have answered their questions for this level
  const questionsPerLevel = gameState.questionsPerTeam * gameState.numTeams;
  if (gameState.usedQuestions.length >= questionsPerLevel) {
    if (gameState.currentLevel < 3) {
      showLevelComplete();
    } else {
      showWinner();
    }
  } else {
    loadQuestion();
  }
}

// Show Level Complete
function showLevelComplete() {
  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback success';
  feedback.innerHTML = `
    <h3>🎉 انتهى المستوى ${gameState.currentLevel}!</h3>
    <p>النتائج الحالية:</p>
    ${gameState.teams.map(team => `<p><strong>${team.name}:</strong> ${team.score} نقطة</p>`).join('')}
  `;
  feedback.classList.remove('hidden');
  
  document.getElementById('nextBtn').textContent = 'المستوى التالي';
  document.getElementById('nextBtn').classList.remove('hidden');
  document.getElementById('nextBtn').onclick = () => {
    gameState.currentLevel++;
    gameState.currentTeamIndex = 0;
    gameState.currentQuestionIndex = 0;
    prepareLevelQuestions();
    document.getElementById('nextBtn').textContent = 'التالي';
    document.getElementById('nextBtn').onclick = nextQuestion;
    updateScoreboard();
    updateProgressBar();
    loadQuestion();
    saveGameState();
  };
  
  // Hide options
  document.getElementById('options').innerHTML = '';
  document.getElementById('questionText').textContent = '';
}

// Show Winner
function showWinner() {
  clearStorage(); // Clear saved game when finished
  // Sort teams by score
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  
  // Hide game screen
  document.getElementById('gameScreen').classList.add('hidden');
  
  // Show winner screen
  const winnerScreen = document.getElementById('winnerScreen');
  winnerScreen.classList.remove('hidden');
  
  document.getElementById('winnerAnnouncement').textContent = `🏆 الفائز هو: ${winner.name} 🏆`;
  
  const finalScoresList = document.getElementById('finalScoresList');
  finalScoresList.innerHTML = '';
  
  sortedTeams.forEach((team, index) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'final-team';
    if (index === 0) {
      teamDiv.classList.add('first');
    }
    teamDiv.innerHTML = `
      <strong>${team.name}</strong>
      <span>${team.score} نقطة</span>
    `;
    finalScoresList.appendChild(teamDiv);
  });
}
