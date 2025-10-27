export interface Question {
  id: string;
  question: string;
  answer: string;
  value: number;
  answered?: boolean;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Structure Overview",
    questions: [
      { id: "so100", question: "This is the highest court in Texas for civil and juvenile cases.", answer: "What is the Texas Supreme Court?", value: 100 },
      { id: "so200", question: "This is the highest court in Texas for criminal cases.", answer: "What is the Texas Court of Criminal Appeals?", value: 200 },
      { id: "so300", question: "Texas is one of only two states in the U.S. to have this unique feature in its highest courts.", answer: "What is a dual high court system?", value: 300 },
      { id: "so400", question: "The Texas Supreme Court has this many justices, including the Chief Justice.", answer: "What is 9?", value: 400 },
      { id: "so500", question: "The Texas Court of Criminal Appeals also has this many judges, including a Presiding Judge.", answer: "What is 9?", value: 500 },
    ],
  },
  {
    id: "cat2",
    name: "Intermediate Courts",
    questions: [
      { id: "ic100", question: "These 14 courts serve as the intermediate level between trial courts and the highest courts in Texas.", answer: "What are the Courts of Appeals?", value: 100 },
      { id: "ic200", question: "Texas has this many Courts of Appeals, each covering a specific geographic region.", answer: "What is 14?", value: 200 },
      { id: "ic300", question: "Courts of Appeals primarily handle this type of legal action.", answer: "What are appeals from district and county courts?", value: 300 },
      { id: "ic400", question: "Courts of Appeals hear both of these two types of cases.", answer: "What are civil and criminal cases?", value: 400 },
      { id: "sl1000", question: "This type of court exists in Texas counties to handle probate matters such as wills and guardianships.", answer: "What are the Probate Courts?", value: 1000 },
    ],
  },
  {
    id: "cat3",
    name: "Trial Courts",
    questions: [
      { id: "tc100", question: "These courts are the main trial courts in Texas, handling major civil and criminal cases.", answer: "What are the District Courts?", value: 100 },
      { id: "tc200", question: "There are over this many District Courts in Texas.", answer: "What is 470+? (or 477)", value: 200 },
      { id: "tc300", question: "County Courts at Law mainly handle these kinds of cases.", answer: "What are misdemeanors, civil cases under a certain dollar amount, and appeals from Justice Courts?", value: 300 },
      { id: "tc400", question: "These courts, found in all 254 counties, deal with minor civil and criminal cases, traffic offenses, and small claims.", answer: "What are the Justice of the Peace Courts?", value: 400 },
      { id: "tc500", question: "These courts, usually found in cities, handle violations of city ordinances and minor criminal offenses.", answer: "What are the Municipal Courts?", value: 500 },
    ],
  },
];

export function resetQuestions() {
  categories.forEach((cat) =>
    cat.questions.forEach((q) => {
      q.answered = false;
    })
  );
}
