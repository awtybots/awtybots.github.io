let days = 
[
    0, 1, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 31
];

let day = days.length - 1;

const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const nextAllBtn = document.getElementById('next-all');
const backAllBtn = document.getElementById('back-all');

const post = document.getElementById("post");

function calcDate(date, days)
{
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

async function loadRecap(day)
{
    const res = await fetch(`https://raw.githubusercontent.com/awtybots/awtybots.github.io/main/assets/recaps/Day ${day}.md`);
    if(!res.ok) console.log('fetch failed');

    const text = await res.text();

    return text;
}

function addPost(dayNum, text)
{
    const article = document.createElement('article');

    const title = document.createElement('h2');

    title.innerText =  `Day ${dayNum}`;
    title.className = "display-5 link-body-emphasis mb-1";
    title.id = "recap-post";
    article.appendChild(title);

    timestamp = document.createElement('p');
    timestamp.className = 'blog-post-meta';
    date = new Date(2026, 0, 9);
    timestamp.innerText = calcDate(date, dayNum).toDateString() + " by Xavier Eldridge";
    console.log(dayNum);
    article.appendChild(timestamp);

    article.appendChild(document.createElement('hr'));

    const rec = document.createElement('div');
    rec.innerHTML = marked.parse(text);

    article.appendChild(rec)
    

    post.replaceChildren(article);
}

nextBtn.addEventListener('click', async () => 
{
    day++;
    if(day == days.length - 1)
    {
        nextBtn.disabled = true;
        nextAllBtn.disabled = true;
    }

    backBtn.disabled = false;
    backAllBtn.disabled = false;
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

backBtn.addEventListener('click', async () => 
{
    day--;
    if(day == 0)
    {
        backBtn.disabled = true;
        backAllBtn.disabled = true;
    }

    nextBtn.disabled = false;
    nextAllBtn.disabled = false;
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

backAllBtn.addEventListener('click', async () => 
{
    day = 0;

    backBtn.disabled = true;
    backAllBtn.disabled = true;

    nextBtn.disabled = false;
    nextAllBtn.disabled = false;
    
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

nextAllBtn.addEventListener('click', async () => 
{
    day = days.length - 1;

    nextBtn.disabled = true;
    nextAllBtn.disabled = true;

    backBtn.disabled = false;
    backAllBtn.disabled = false;
    
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});


document.addEventListener('DOMContentLoaded', async function() {
    text = await loadRecap(days[day]);

    addPost(days[day], text);

    nextBtn.disabled = true;
    nextAllBtn.disabled = true;
});
