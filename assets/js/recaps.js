let days = 
[
    0, 1, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 31
];

let day = days.length - 1;

const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');

const post = document.getElementById("post");

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
        nextBtn.style.display = 'none';
    }

    backBtn.style.display = '';
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});

backBtn.addEventListener('click', async () => 
{
    day--;
    if(day == 0)
    {
        backBtn.style.display = 'none';
    }

    nextBtn.style.display = '';
    dayNum = days[day];

    text = await loadRecap(dayNum);

    addPost(dayNum, text);
});


document.addEventListener('DOMContentLoaded', async function() {
    text = await loadRecap(days[day]);

    addPost(days[day], text);

    nextBtn.style.display = 'none';
});
