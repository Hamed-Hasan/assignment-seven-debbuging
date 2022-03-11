let posts=[];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    // ISSUE 1 Line: 20
    likedPostsId.push(id); 
    showPosts(posts);
};

const reportPost = (id) => {
  // Issue 5 Line: 27
  const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
  reportedPostsId.push(id);
    showPosts(remainingPosts);
};

const displayContent = (text) => {
  // Issue 3 Line: 33
    return text.length < 30 ?  text  : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
    }
};

const createPost = (post) => {
    const image = post.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    // Issue 2 User Image Line: 70
    // Issue 4 Who Comment - What Comment Line: 127 - 129
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${post.userImage}"  alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>
                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                      ${post.comments[0].user} 
                      </a>
                      ${post.comments[0].text} 
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
  // Issue 6 Line: 151
  document.getElementById( "liked" ).innerHTML = ''
    const likedPosts = getLikedPosts();
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
    // Issue 6 Line: 161
  document.getElementById( "reported" ).innerHTML = ''
    const reportedPosts = getReportedPosts();
    // Issue 5 Line: 164
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
    posts = await data.json();
  showPosts(posts);
}

loadPosts();