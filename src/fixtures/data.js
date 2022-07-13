// import moment from "moment";
// import { v4 as uuid } from "uuid";

export const batches = [
  {
    id: 1,
    batchName: "Text Editor Batch",
    description: "Batch for running/killing Text Editor Applications",
    programs: [
      {
        id: 1,
        programName: "Notepad",
        // prettier-ignore
        path: "C:\Windows\System32\notepad.exe",
        description: "Notepad programs description",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
      {
        id: 2,
        programName: "VSCode",
        // prettier-ignore
        path: "C:\Users\ay185066\AppData\Local\Programs\Microsoft VS Code\Code.exe",
        description: "VSCode programs description",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: false,
        createdAt: 0,
      },
      {
        id: 3,
        programName: "Notepad++ Plus Plus",
        // prettier-ignore
        path: "C:\Program Files (x86)\Notepad++\notepad++.exe",
        description: "Notepad++ programs description",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
    ],
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 2,
    batchName: "Browser Batch",
    description: "Batch for Browser",
    programs: [
      {
        id: 1,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Users\ay185066\AppData\Local\Google\Chrome\Application",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
      {
        id: 2,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Program Files\Mozilla Firefox\firefox.exe",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
      {
        id: 3,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Program Files\Mozilla Firefox\firefox.exe",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: false,
        createdAt: 0,
      },
    ],
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 3,
    batchName: "Another Batch",
    description: "Batch for Browser",
    programs: [
      {
        id: 1,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Users\ay185066\AppData\Local\Google\Chrome\Application",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
      {
        id: 2,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Program Files\Mozilla Firefox\firefox.exe",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: true,
        createdAt: 0,
      },
      {
        id: 3,
        programName: "Chrome",
        // prettier-ignore
        path: "C:\Program Files\Mozilla Firefox\firefox.exe",
        description: "Description of chrome browser",
        executionDelay: {
          before: 500,
          after: 500,
        },
        isVisible: false,
        createdAt: 0,
      },
    ],
    isVisible: false,
    createdAt: 0,
  },
];
