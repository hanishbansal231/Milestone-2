window.addEventListener('DOMContentLoaded', () => {
    const BlogAddBtn = document.querySelector('.BlogAddIcon');
    const closeBtn = document.querySelector('.closeBtn');
    const formContainer = document.querySelector('.formContainer');
    const blogBoxs = document.querySelector('.blogBoxs');
    const form = document.querySelector('.form');
    const blogBtns = document.querySelectorAll('.blogBtn');
    const showBLogBtn = document.querySelector('.showBLogBtn');
    const showBLogContainer = document.querySelector('.showBLogContainer');

    const blogArr = [];
    BlogAddBtn.addEventListener('click', () => {
        formContainer.classList.add('active');
        blogBoxs.style.display = 'none';
    });
    closeBtn.addEventListener('click', () => {
        formContainer.classList.remove('active');
        blogBoxs.style.display = 'grid';
    });

    const setData = (name, Data) => {
        const jsonData = JSON.stringify(Data);
        localStorage.setItem(name, jsonData);
    }
    const getData = (name) => {
        const resultData = localStorage.getItem(name);
        const result = JSON.parse(resultData);
        return result;
    }
    const displayData = (datas) => {
        let addDataBlog = '';
        datas.forEach((data) => {
            addDataBlog += `
       <div class="blogBox">
       <div class="blogImage"><img src="${data.post}" alt=""></div>
       <div class="blogContant">
           <h2 class="heading">${data.title}</h2>
           <h3 class="subHeading">${data.description.split(" ").slice(0, 10).join(" ")}</h3>
           <button class="blogBtn">Read</button>
       </div>
       </div>`
        })
        blogBoxs.innerHTML = addDataBlog;
    }
    const loadAndDisply = () => {
        const datas = getData("Blogs") || [];
        blogArr.push(...datas);
        displayData(blogArr);
    }
    const blogData = (e) => {
        e.preventDefault();
        const postBlog = document.querySelector('#post').value;
        const titleBlog = document.querySelector('#title').value;
        const descriptionBlog = document.querySelector('#description').value;
        const writeBlog = document.querySelector('#write').value;
        const blogData = {
            post: postBlog,
            title: titleBlog,
            description: descriptionBlog,
            write: writeBlog,
        };
        blogArr.push(blogData);
        setData("Blogs", blogArr);
        displayData(blogArr);
        // form.reset();
        // formContainer.classList.remove('active');
    }
    const showBlogDetails = (blogData) => {
        console.log(blogData.description.slice(7).split(" ").join());
        const showData = ` <div class="showContainer">
    <div class="profileBox">
        <div class="profileContant">
            <h2 class="heading">${blogData.title}</h2>
           <h3 class="subHeading">${blogData.description}</h3>
        </div>
        <div class="image"><img src="${blogData.post}" alt=""></div>
    </div>
    <div class="BlogWriteBox">
        <p>${blogData.write}</p>
    </div>
</div>`
        showBLogContainer.innerHTML = showData;


        BlogAddBtn.style.display = 'none';
        showBLogBtn.style.display = 'flex';
        showBLogContainer.style.display = 'flex';
        blogBoxs.style.display = 'none';
        showBLogBtn.addEventListener('click', () => {
            showBLogContainer.style.display = 'none';
            showBLogBtn.style.display = 'none';
            BlogAddBtn.style.display = 'flex';
            blogBoxs.style.display = 'grid';
        })
    }
    const handleBlogButtonClick = (e) => {
        const blogBox = e.target.closest('.blogBox');
        if (blogBox) {
            const index = Array.from(blogBoxs.children).indexOf(blogBox);
            const blogData = blogArr[index];
            showBlogDetails(blogData);
        }
    };
    form.addEventListener('submit', blogData);
    window.addEventListener('load', loadAndDisply);
    blogBoxs.addEventListener('click', handleBlogButtonClick);

});