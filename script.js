const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function thoughtsGenerator(textToWrite) {
    const THOUGHTS = [
  "The unexamined life is not worth living." ,
  "Whereof one cannot speak, thereof one must be silent." ,
  "I think, therefore I am." ,
  "He who has a why to live can bear almost any how." ,
  "Man is condemned to be free." ,
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit." ,
  "Happiness depends upon ourselves." ,
  "No man ever steps in the same river twice." ,
  "The only thing I know is that I know nothing." ,
  "God is dead. God remains dead. And we have killed him." ,
  "Liberty consists in doing what one desires." ,
  "Life must be understood backward. But it must be lived forward." ,
  "Hell is other people." ,
  "Out of the strain of the soul’s struggle with itself comes victory." ,
  "To be is to be perceived." ,
  "We live in the best of all possible worlds." ,
  "Waste no more time arguing about what a good man should be. Be one." ,
  "The mind is furnished with ideas by experience alone." ,
  "Leisure is the mother of philosophy." ,
  "Custom is the great guide of human life." ,
  "Man is born free, and everywhere he is in chains." ,
  "It is desire that drives human action, not reason." ,
  "The limits of my language mean the limits of my world." ,
  "One cannot step twice into the same stream." ,
  "There is only one truly serious philosophical problem, and that is suicide." ,
  "The brave man is he who overcomes not only his enemies but his pleasures." ,
  "Doubt is the origin of wisdom." ,
  "He who is not a good servant will not be a good master." ,
  "Virtue is its own reward." ,
  "History repeats itself, first as tragedy, second as farce." ,
  "To live is to suffer, to survive is to find some meaning in the suffering." ,
  "Knowledge is power." ,
  "He who fears death will never do anything worthy of a man who is alive." ,
  "Patience is bitter, but its fruit is sweet." ,
  "The highest goal of human existence is self-realization." ,
  "Science is what you know. Philosophy is what you don't know." ,
  "Thoughts without content are empty, intuitions without concepts are blind." ,
  "Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree." ,
  "He who knows others is wise; he who knows himself is enlightened." ,
  "The measure of a man is what he does with power." ,
  "Truth resides in the simplicity, not in the multiplicity of things." ,
  "Nothing exists except atoms and empty space; everything else is opinion." ,
  "Beware the barrenness of a busy life.",
  "Order your soul and reduce your wants." ,
  "The journey of a thousand miles begins with one step." ,
  "The function of prayer is not to influence God, but rather to change the nature of the one who prays." ,
  "Wise men speak because they have something to say; fools because they have to say something." ,
  "Freedom is secured not by the fulfilling of one's desires, but by the removal of desire." ,
  "Act only according to that maxim whereby you can will that it should become a universal law." ,
  "Without music, life would be a mistake." ,
  "A subject can see the world only through the lens of its own consciousness." ,
  "Happiness is not an ideal of reason, but of imagination." ,
  "Life expands or contracts in proportion to one's courage." ,
  "The soul becomes dyed with the color of its thoughts." ,
  "Small is the number of people who see with their own eyes and feel with their own hearts." ,
  "Time is a child playing checkers; the kingship belongs to a child." ,
  "Suffering reveals the true depth of human dignity." ,
  "He who is cruel to animals becomes hard also in his dealings with men." ,
  "The roots of education are bitter, but the fruit is sweet." ,
  "It is not death that a man should fear, but he should fear never beginning to live." ,
  "Every man takes the limits of his own field of vision for the limits of the world." ,
  "The price good men pay for indifference to public affairs is to be ruled by evil men." ,
  "Reality is merely an illusion, albeit a very persistent one." ,
  "Nothing is permanent except change." ,
  "We do not describe the world we see; we see the world we can describe." ,
  "One cannot love or hate something unless one has first understood it." ,
  "Morality is the herd-instinct in the individual." ,
  "Justice is the first virtue of social institutions." ,
  "An unexamined idea is an unguided action." ,
  "In everything, there is a share of everything." ,
  "He who conquers himself is the mightiest warrior." ,
  "The greatest happiness of the greatest number is the foundation of morals and legislation." ,
  "To know what is right and not to do it is the worst cowardice." ,
  "Is man merely a mistake of God's? Or God merely a mistake of man's?" ,
  "Man is the measure of all things." ,
  "Doubt is not a pleasant condition, but certainty is an absurd one." ,
  "Those who do not remember the past are condemned to repeat it." ,
  "Nature does nothing in vain." ,
  "The power of holding two contradictory beliefs in one's mind simultaneously, and accepting both of them, is wisdom." ,
  "Life is a series of natural and spontaneous changes." ,
  "Beauty lies in the eye of the beholder." ,
  "Philosophy begins in wonder." ,
  "Courage is grace under pressure." ,
  "Great minds discuss ideas; average minds discuss events; small minds discuss people." ,
  "The difficulty lies not so much in developing new ideas as in escaping from old ones." ,
  "To live is the rarest thing in the world. Most people exist, that is all." ,
  "Everything has beauty, but not everyone sees it." ,
  "Self-control is strength. Right thought is mastery. Calmness is power." ,
  "There is no evil that cannot be overcome by good." ,
  "We suffer more often in imagination than in reality." ,
  "Silence is a true friend who never betrays." ,
  "All human knowledge is divided into opinion and certainty." ,
  "Life is not a problem to be solved, but a reality to be experienced." ,
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate." ,
  "He who has overcome his fears will truly be free." ,
  "Reason is a slave of the passions." ,
  "Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't." ,
  "Wealth consists not in having great possessions, but in having few wants." ,
  "The objective world is a construction of our perception." ,
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment." ,
  "The more I read, the more I acquire, the more certain I am that I know nothing." ,
  "Ignorance is the root and stem of all evil." ,
  "Conscience is a man's compass." ,
  "The mind is everything. What you think you become." ,
  "Truth is not found in numbers, but in clarity of thought." ,
  "A good decision is based on knowledge and not on numbers." ,
  "Dwell on the beauty of life. Watch the stars, and see yourself running with them." ,
  "An investment in knowledge pays the best interest." ,
  "Whatever is well said by another is mine." ,
  "Virtue is a mean between two extremes." ,
  "Character is destiny." ,
  "The energy of the mind is the essence of life." ,
  "There is nothing either good or bad, but thinking makes it so." ,
  "Do not spoil what you have by desiring what you have not." ,
  "Man is a tool-using animal." ,
  "Wisdom begins in wonder." ,
  "The world is representation." ,
  "If you want to improve, be content to be thought foolish and stupid." ,
  "We are shaped by our thoughts; we become what we think." ,
  "Chaos contains the seeds of order." ,
  "To find yourself, think for yourself." ,
  "Not life, but good life, is to be chiefly valued." ,
  "The highest outcome of education is tolerance." ,
  "The world is divided into those who act and those who reflect." ,
  "He who acts with intent builds his own destiny." ,
  "The beginning of wisdom is the definition of terms." ,
  "Nothing great was ever achieved without enthusiasm." ,
  "Doubt everything at least once." ,
  "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth." ,
  "Fear comes from uncertainty; wisdom comes from acceptance." ,
  "The secret of change is to focus all of your energy not on fighting the old, but on building the new." ,
  "Knowledge without justice ought to be called cunning rather than wisdom." ,
  "True wisdom comes to each of us when we realize how little we understand about life, ourselves, and the world." ,
  "Hope is a waking dream." ,
  "The soul is healed by being with children." ,
  "It is the mark of an educated mind to be able to entertain a thought without accepting it." ,
  "No evil can happen to a good man, either in life or after death." ,
  "Peace comes from within. Do not seek it without." ,
  "We are prisoners of our own assumptions." ,
  "Freedom is the right to choose." ,
  "The present moment is filled with joy and happiness. If you are attentive, you will see it." ,
  "Every solution breeds new problems." ,
  "We learn from history that we do not learn from history." ,
  "The true measure of a man is how he treats someone who can do him absolutely no good." ,
  "To love is to place our happiness in the happiness of another." ,
  "Nature does not hurry, yet everything is accomplished." ,
  "Belief is the absence of inquiry." ,
  "Action expresses priorities." ,
  "The art of living is more like wrestling than dancing.",
  "We must cultivate our garden."
];

    let monke = document.getElementById('monkey-image');
    let button = document.getElementById('thought-button');
    let daily_thought = document.getElementById('daily-thought');
    let animation = document.getElementById('js-animation-element');

    daily_thought.textContent = "Your daily thought will appear here.";
    animation.textContent = "";
    
    let randThought =  Math.floor(Math.random() * THOUGHTS.length);
    let thought = THOUGHTS[randThought];

    monke.src = "monke_thinking.png";
    
    for (let i = 0; i < textToWrite.length; i++) {
        animation.textContent += textToWrite[i];
        if (textToWrite[i] === '.') {
            await wait(500);
        } else {
            await wait(80);
        }
    } 
    await wait(500);
    
    daily_thought.textContent = thought;

    monke.src = "monke.png";
}

const newsletterForm = document.getElementById("newsletter_form");
const emailInput = document.getElementById("email");
const confirmation = document.getElementById("confirmation");

newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;

    try {
        const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await response.json();

        if (response.ok) {
            confirmation.textContent = data.message;
            newsletterForm.reset();
        } else {
            confirmation.textContent = data.error;
        }
    } catch (error) {
        confirmation.textContent = "Something went wrong. Please try again.";
    }
});
