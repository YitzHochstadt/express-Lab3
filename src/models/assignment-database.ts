import Assignment from "./Assignment";

let nextId: number = 1;
let data: Assignment[] = [];

// Prepopulate some data
createAssignment({ title: "APUSH Test", score: 87, total: 100, completed: true});
createAssignment({ title: "AP AB Calc Quiz", score: 9, total: 10, completed: true});
createAssignment({ title: "Honors English Final", score: 24, total: 25, completed: true});
createAssignment({ title: "Senior Science Seminar Project", score: 100, total: 100, completed: false});

export function createAssignment(assignment: Assignment):void {
  assignment.id = nextId++;
  data.push(assignment);
}

export function readAllAssignments(): Assignment[] {
  return data;
}

export function readAssignmentById(id: number): Assignment|undefined {
  return data.find(assignment => assignment.id === id);
}

/**
 * Replace the assignment with the same ID.
 * 
 * @return true if found, false if not found
 */
export function updateAssignment(assignment: Assignment): boolean {
  const index = data.findIndex(a => a.id === assignment.id);
  if (index == -1) {
    return false;
  } else {
    data[index] = assignment;
    return true;
  }
}

/**
 * @return true if found, false if not found
 */
export function deleteAssignment(id: number): boolean {
  const index = data.findIndex(assignment => assignment.id === id);
  if (index == -1) {
    return false;
  } else {
    data.splice(index, 1);
    return true;
  }
}
export function averageScore(array:Assignment[]):number{
  let sum = 0;
  for (let assignment of array){
    if (assignment.completed){
    sum += assignment.score / assignment.total * 100;
  }
}
  return sum / array.length;
}