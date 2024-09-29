This was our submission for MHacks 2024!

**Inspiration**

Ever struggle getting through online assigned readings? Expected to read hundreds of online pages for research, clubs, or personal study? FocusFlow is the solution to all of these problems! Largely inspired by our teams personal connection to individuals with ADHD and peers with trouble concentrating especially when reading large scale online documents, FocusFlow uses a Machine Learning and Neural Network handled by an Intel AI PC backend, Artificial Intelligence, and a heavily developed Interactive UI to bring efficient online reading to the public.

ADHD and other neurological and mental health disorders have only become more prevalent in recent years. Studies from the National Institute of Mental Health have shown that in the year 2022 7.1 million children and adolescents were diagnosed with ADHD, not to mention other similar disorders such as ADD. Our tool is designed to reinforce learning in those affected, and create efficiency for those that struggle with holding concentration while reading.

**What it does**

FocusFlow is an dynamic webapp which prompts the user to enter a PDF or any text based document. After this data is entered, our code runs an AI API based algorithm which extracts the data from the source file and displays it in a dynamic UI format on the "parsed" page of the website. From there, the user is prompted to calibrate their webcam to their own personal iris movement using a webcam eye tracking library using ML. This library allows us to track where a user is focused on the screen after calibration, and continually trains on machine learning data based off your usage for high accuracy and adaptability despite the hardware constraints of using only a webcam. After calibration, the user is shown their parsed text document in our dynamic UI. As the user reads, text dynamically becomes highlighted through our eye tracking, which allows users to both keep their pace, and stay focused. If our AI were to detect someone's vision becoming unfocused (go on their phone, or some other device off screen), the software will softly change color to prompt the user back to the task. After the PDF is completed, data including words read, and total time spent reading are processed by our backend to provide constructive information on how a user can continually improve their focus. In addition, we have implemented an AI Chatbot using the ChatGPT LLM API inputted with the text, which allows users to gain insightful, personalized feedback on how they are doing. This LLM chatbot, combined with our AI parsing, attention quantifying neural network, and eyetracker ML algorithm, are all ways we have used cutting-edge technologies to address this problem.

**How we built it**

FocusFlow is built with a heavy emphasis on a Machine Learning framework with interactive UI at the forefront of our development. We used a React.JS frontend through Vite, combined with a Node.JS backend for our LLM chatbot API management. We also used an LLM API for intelligent parsing of a wide array of pdfs (papers with latex, diagrams, etc). We then used JavaScript to dynamically highlight text in our UI based off vision tracking from the WebGazer.js machine learning library. Finally, we trained a Long-Short Term Memory (LSTM) Recurrent Neural Network (RNN) regression model using Intel Cloud capabilities to determine if users are focused or not. We generated our own datasets, and trained and tested completely on our own from recorded videos. Finally, to add some fun to our site, we integrated games that can be unlocked after a certain amount of time studying, providing a reward for good focus.

**Challenges we ran into**

The Intel AI PCs had trouble running throughout Saturday, which led our team to begin building around the idea that we would eventually have access to this tool. This process led to a new and innovative development strategy across our team, and we eventually managed to get access to Intel Cloud for our ML training.
None of our team members were actively proficient in HTML or Javascript, but over the last 24 hours our skill sets have drastically increased.
Sleeping ;) ## Accomplishments that we're proud of
Developing a full-scale LSTM RNN Machine Learning Algorithm that we generated data for, trained ourselves, and tested for accuracy.
We learned a ton about AI through our four AI applications (LLM for parsing and chatbot, NN for metrics and machine learning)
Development of a full scale React/Node interactive webapp complete with animations, file transfer, and an integrated chatbot.
Driving 8 hours to Ann Arbor!
