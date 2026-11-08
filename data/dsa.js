/* Data Structures and Algorithms - written from the Week 15-17 review sheets (screenshots) */
window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || [];
window.QUIZ_SUBJECTS.push({
  id: "dsa",
  title: "Data Structures and Algorithms",
  description: "Week 15 Sorting, Week 16 Searching, Week 17 Greedy and Dynamic Programming.",
  topics: [
    {
      name: "Week 15: Sorting Algorithms",
      questions: [
        { q: "What do you call arranging items in a particular order, such as smallest to largest or alphabetically?", a: "Sorting", d: ["Searching", "Hashing", "Traversing"] },
        { q: "Which algorithm compares neighboring items and swaps them when they are in the wrong order, repeating until sorted?", a: "Bubble Sort", alt: ["Bubble"], d: ["Selection Sort", "Insertion Sort", "Merge Sort"] },
        { q: "Which algorithm finds the smallest item in the unsorted part and places it in the next correct position?", a: "Selection Sort", alt: ["Selection"], d: ["Bubble Sort", "Insertion Sort", "Heap Sort"] },
        { q: "Which algorithm takes one item at a time and inserts it into the correct position among items already arranged, like arranging playing cards in your hand?", a: "Insertion Sort", alt: ["Insertion"], d: ["Bubble Sort", "Selection Sort", "Quick Sort"] },
        { q: "Which algorithm splits a list into smaller parts, sorts each part, then merges them into one sorted list?", a: "Merge Sort", alt: ["Merge"], d: ["Quick Sort", "Heap Sort", "Bubble Sort"] },
        { q: "Which algorithm chooses a pivot item and divides the other items into smaller and larger groups?", a: "Quick Sort", alt: ["Quicksort", "Quick"], d: ["Merge Sort", "Heap Sort", "Selection Sort"] },
        { q: "Which algorithm organizes items in a heap so the highest- or lowest-priority item can be selected repeatedly?", a: "Heap Sort", alt: ["Heapsort", "Heap"], d: ["Quick Sort", "Merge Sort", "Insertion Sort"] },
        { q: "Which algorithm is like a priority queue where the most urgent task is always brought to the top?", a: "Heap Sort", alt: ["Heapsort", "Heap"], d: ["Selection Sort", "Insertion Sort", "Bubble Sort"] },
        { q: "Which algorithm is like choosing the shortest student and placing them first, then repeating?", a: "Selection Sort", alt: ["Selection"], d: ["Bubble Sort", "Merge Sort", "Quick Sort"] },
        { q: "Which sorting method works well for small lists or lists that are nearly sorted?", a: "Insertion Sort", alt: ["Insertion"], d: ["Merge Sort", "Heap Sort", "Quick Sort"] },
        { q: "Which sorting algorithm is easy to understand but slow for large lists?", a: "Bubble Sort", alt: ["Bubble"], d: ["Merge Sort", "Quick Sort", "Heap Sort"] },
        { q: "Merge Sort is efficient for large lists, but it needs extra what?", a: "Memory", alt: ["Space", "Extra memory", "Extra space"], d: ["Time", "Pivots", "Sorted input"] },
        { q: "The result of Quick Sort depends partly on the choice of what?", a: "Pivot", alt: ["The pivot", "Pivot choice", "Pivot choices"], d: ["Heap", "Midpoint", "Subarray size"] },
        { q: "After Pass 1 of Bubble Sort on [5, 3, 4], what does the list look like?", a: "[3, 4, 5]", alt: ["3 4 5", "3, 4, 5"], d: ["[5, 3, 4]", "[3, 5, 4]", "[4, 3, 5]"] },
        { q: "Merge Sort splits [5, 3, 4, 1] into [5, 3] and [4, 1], sorts each, then merges. What is the final list?", a: "[1, 3, 4, 5]", alt: ["1 3 4 5", "1, 3, 4, 5"], d: ["[1, 4, 3, 5]", "[3, 5, 1, 4]", "[5, 4, 3, 1]"] },
        { q: "In Quick Sort on [5, 3, 4, 1] with pivot 4, which items go in the smaller group?", a: "3 and 1", alt: ["1 and 3", "3, 1", "1, 3", "[3, 1]", "[1, 3]"], d: ["5 only", "5 and 3", "1 only"] },
        { q: "Which of these is the best summary of choosing a sorting method?", a: "There is no single best method; it depends on the data size, how sorted it is, memory and performance needed", d: ["Quick Sort is always the best", "Bubble Sort is best for large lists", "Merge Sort is always the fastest in every case"], only: "mc" }
      ]
    },
    {
      name: "Week 16: Searching Algorithms",
      questions: [
        { q: "What do you call finding a specific item in a collection of data?", a: "Searching", d: ["Sorting", "Merging", "Hashing"] },
        { q: "Which search checks each item one by one until the target is found?", a: "Linear Search", alt: ["Linear", "Sequential Search"], d: ["Binary Search", "Jump Search", "Interpolation Search"] },
        { q: "Which search works on a sorted list by checking the middle item and then focusing on the half where the target can be?", a: "Binary Search", alt: ["Binary"], d: ["Linear Search", "Selection Sort", "Quick Sort"] },
        { q: "What is the time complexity of Linear Search?", a: "O(n)", d: ["O(log n)", "O(1)", "O(n²)"] },
        { q: "What is the time complexity of Binary Search?", a: "O(log n)", alt: ["O(logn)", "log n"], d: ["O(n)", "O(1)", "O(n²)"] },
        { q: "What requirement must a list meet before Binary Search can be used?", a: "It must be sorted", alt: ["Sorted", "Sorted list", "The list must be sorted"], d: ["It must contain unique items", "It must be small", "It must be a linked list"] },
        { q: "Which search works on both unsorted and sorted lists but can be slow for large lists?", a: "Linear Search", alt: ["Linear", "Sequential Search"], d: ["Binary Search", "Merge Sort", "Heap Sort"] },
        { q: "Using Linear Search to find 25 in [10, 30, 20, 25, 40], how many steps are needed?", a: "4", alt: ["four", "4 steps"], d: ["1", "3", "5"] },
        { q: "Using Binary Search to find 25 in the sorted list [10, 20, 25, 30, 40], how many steps are needed?", a: "1", alt: ["one", "1 step"], d: ["2", "3", "5"] }
      ]
    },
    {
      name: "Week 17: Greedy and Dynamic Programming",
      questions: [
        { q: "Which approach builds a solution by always choosing the best local option at each step?", a: "Greedy Algorithm", alt: ["Greedy", "Greedy Algorithms"], d: ["Dynamic Programming", "Binary Search", "Merge Sort"] },
        { q: "Which approach solves a problem by breaking it into smaller subproblems and reusing the results to avoid repeated work?", a: "Dynamic Programming", alt: ["DP"], d: ["Greedy Algorithm", "Linear Search", "Bubble Sort"] },
        { q: "Which approach is simple and fast but not always the best overall solution?", a: "Greedy Algorithm", alt: ["Greedy", "Greedy Algorithms"], d: ["Dynamic Programming", "Binary Search", "Heap Sort"] },
        { q: "Which approach is more efficient and often gives an optimal solution for problems with overlapping subproblems?", a: "Dynamic Programming", alt: ["DP"], d: ["Greedy Algorithm", "Linear Search", "Insertion Sort"] },
        { q: "To make ₱15 with coins of ₱10, ₱5 and ₱1, which coins does the greedy method choose?", a: "₱10 and ₱5", alt: ["10 and 5", "10 + 5", "₱10 + ₱5", "one 10 and one 5"], d: ["₱5, ₱5 and ₱5", "₱10 and five ₱1 coins", "Fifteen ₱1 coins"] },
        { q: "In the greedy coin change example, which coin is chosen first?", a: "The largest coin", alt: ["Largest coin", "Largest", "The largest coin that fits", "₱10", "10"], d: ["The smallest coin", "A random coin", "The middle coin"] },
        { q: "What kind of subproblems is Dynamic Programming best suited for?", a: "Overlapping subproblems", alt: ["Overlapping"], d: ["Independent subproblems", "Sorted subproblems", "Unique subproblems"] },
        { q: "In the Dynamic Programming example, what is F(6), the 6th Fibonacci number?", a: "8", d: ["5", "6", "13"] },
        { q: "In the Fibonacci example, what is F(5)?", a: "5", d: ["3", "8", "4"] },
        { q: "Which of these problems is given as an example where Dynamic Programming is useful?", a: "Knapsack", alt: ["Knapsack problem", "Fibonacci", "Scheduling"], d: ["Bubble sorting", "Linear searching", "Coin flipping"], only: "mc" }
      ]
    }
  ]
});
