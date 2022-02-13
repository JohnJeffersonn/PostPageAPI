(async function() {
    const postNav = document.querySelector('.nav__list');
    const postPage = document.querySelector('.comments-container');

    if (postNav) {
        createPostsNav();
        createPostsList();
    }

    if (postPage) {
        createPostPage();
        createPostComment();
    }

    async function createPostComment() {
        const commentBlock = document.querySelector('.comments-block');
        let postComment = '';

        const pageParams = new URLSearchParams(location.search);
        const postId = pageParams.get('id');

        const response = await fetch(`http://gorest.co.in/public-api/comments?post_id=${postId}`);
        const result = await response.json();
        const comment = result.data;

        comment.map(item => {
            postComment = `

        <div class="block-avatar"></div>

      <div class="card-comment">
          <div class="card-header">
          <span class="span-from">From:</span>
              ${item.email}
          </div>
          <div class="card-body">
              <h3 class="card-title">${item.name}</h3>
              <p class="card-text">${item.body}</p>
          </div>

      </div>
  `;

            commentBlock.innerHTML = postComment;
        });
    }
    async function getPostsData() {
        const pageParams = new URLSearchParams(location.search);
        const postPage = pageParams.get('page');

        const response = await fetch(`http://gorest.co.in/public-api/posts?page=${postPage == null ? 1 : postPage}`);
        const result = await response.json();
        const prevLink = document.querySelector(".pagination-prev")
        const nextLink = document.querySelector(".pagination-next")

        prevLink.href = `index.html?page=${+postPage-1 }`;
        nextLink.href = `index.html?page=${+postPage +1}`;

        return {
            posts: result.data,
            pagination: result.meta.pagination,
        };
    }
    async function createPostPage() {
        const postPage = document.querySelector('.post-block');
        let postContent = '';

        const pageParams = new URLSearchParams(location.search);
        const postId = pageParams.get('id');

        const response = await fetch(`http://gorest.co.in/public-api/posts/${postId}`);
        const result = await response.json();
        const post = result.data;

        postContent = `
      <div class="card">
          <div class="card-body">
          <div class="card-img">
          <p class="card-img-text">Image</p>
          </div>
              <h1 class="card-title">${post.title}</h1>
              <p class="card-text">${post.body}</p>
          </div>
      </div>
  `;

        postPage.innerHTML = postContent;
    }

    async function createPostsNav() {
        const pagination = await getPostsData();
        const postsNav = document.querySelector('.nav__list');
        let postNav = '';
        const pageParams = new URLSearchParams(location.search);
        const postPage = pageParams.get('page');

        for (let i = 1; i <= pagination.pagination.pages; i++) {
            if (i === +postPage) {
                postNav += `
        <option selected value="index.html?page=${i}">  Page ${i}
        </option>
  `;
            } else {
                postNav += `
    <option  value="index.html?page=${i}">  Page ${i}
    </option>
`;
            }

            postsNav.innerHTML = postNav;
        }
        // const paginationNav = document.querySelector('.pagination');
        // paginationNav.addEventListener("click", function(event) {
        //     let btn = event.target.closest('.btn-pagination');
        //     if (btn) {
        //         event.preventDefault();
        //         let i = postsNav.selectedIndex;
        //         let up = btn.classList.contains('pagination-prev') ? -1 : 1;
        //         let len = postsNav.options.length - 1;
        //         let k = i + up;
        //         k = Math.max(0, Math.min(k, len));
        //         if (k !== i) {
        //             postsNav.selectedIndex = k;
        //             k++
        //             createPostsList(page = k)
        //         }

        //     }


        // });


    }


    async function createPostsList() {
        const posts = await getPostsData();
        const postsList = document.querySelector('.posts-list');
        let postItem = '';

        for (let i = 0; i < posts.posts.length; i++) {
            postItem += `

      <div class="slide__blocks">

      <div class="card-img">
      <p class="card-img-text">Image</p>
      </div>
           <h3 class="slide__title">${posts.posts[i].title}</h3>
           <p class="slide__body">${posts.posts[i].body}</p>
           <a class=" btn-more" href="post.html?id=${posts.posts[i].id}">
       Click for read
        </a>
       </div>

      `;

            postsList.innerHTML = postItem;
        }

    }

}());
