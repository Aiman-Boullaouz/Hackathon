import { analyzeJournalEntry } from './journal_ai';

async function testJournalAI() {
    try {
        const testEntry = "Today was a great day! I went for a walk in the park and felt really peaceful.";
        console.log("Testing journal entry analysis...");
        console.log("Entry:", testEntry);
        
        const analysis = await analyzeJournalEntry(testEntry);
        console.log("\nAnalysis Result:");
        console.log(analysis);
    } catch (error) {
        console.error("Error:", error);
    }
}

testJournalAI(); 