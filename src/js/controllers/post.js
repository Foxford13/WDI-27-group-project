angular
.module('groupProject')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsShowCtrl', PostsShowCtrl)
.controller('PostsEditCtrl', PostsEditCtrl);

PostsIndexCtrl.$inject = ['Post','filterFilter', '$scope'];
function PostsIndexCtrl(Post, filterFilter, $scope) {
  const vm = this;
  vm.delete = postsDelete;
  vm.all = [];

  Post.query()
  .$promise
  .then((posts) => {
    vm.all = posts;
    filterPosts();
  });

  function postsDelete(post){

    Post.delete({ id: post._id })
    .$promise
    .then(() => {
      const index = vm.all.indexOf(post);
      vm.all.splice(index, 1);
      filterPosts();
    });
  }



  function filterPosts() {

    const params = { title: vm.q, postType: vm.postType};

    if(vm.useDate) params.date = vm.date;

    vm.filtered = filterFilter(vm.all, params);



  }
  function lowerThan(prop, val){

    if(vm.useSlider) {
      return function(post){
        console.log(post);
        if (post[prop] < val || post[prop] === undefined) return true;
      };
    }
  }
  vm.lowerThan = lowerThan;

  function dateFilter(from, to) {
    if(from && to) {
      return function(item) {
        const dateFrom = from.getTime();
        const dateTo = to.getTime();
        const postDate = new Date(item.date).getTime();
        if (postDate > dateFrom && postDate < dateTo)  return true;
      };
    }
  }

  vm.dateFilter = dateFilter;



  $scope.$watchGroup([

    () => vm.q,
    () => vm.postType,
    () => vm.date
  ], filterPosts);
}


PostsShowCtrl.$inject = ['$state', 'Post', 'PostComment'];
function PostsShowCtrl($state, Post, PostComment) {
  const vm = this;

  vm.post = Post.get($state.params);

  vm.newComment = {};

  function addComment() {

    PostComment
    .save({ postId: vm.post.id }, vm.newComment)
    .$promise
    .then((comment) => {
      vm.post.comments.push(comment);
      vm.newComment = {};
    });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    PostComment
    .delete({ postId: vm.post.id, id: comment.id })
    .$promise
    .then(() => {
      const index = vm.post.comments.indexOf(comment);
      vm.post.comments.splice(index, 1);
    });
  }
  vm.deleteComment = deleteComment;
}


PostsNewCtrl.$inject = ['$state', 'Post'];
function PostsNewCtrl($state, Post) {
  const vm  = this;
  vm.create = postsCreate;

  function postsCreate(){
    if (vm.postForm.$valid) {
      Post
      .save(vm.post)
      .$promise
      .then(() => {
        $state.go('postsIndex');
      });
    }
  }

  vm.update = function() {
    const d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    vm.mytime = d;
  };

  // vm.changed = function () {
  //   $log.log('Time changed to: ' + vm.mytime);
  // };

  // vm.clear = function() {
  //   vm.mytime = null;
  // };
}

PostsEditCtrl.$inject = ['$state', 'Post'];
function PostsEditCtrl($state, Post) {
  const vm = this;

  Post.get($state.params)
    .$promise
    .then((post) => {
      vm.post = post;
      vm.post.createdBy = vm.post.createdBy.id;
      vm.post.date = new Date(vm.post.date);
    });

  vm.update = postsUpdate;

  function postsUpdate(){
    Post
    .update($state.params, vm.post)
    .$promise
    .then(() => {
      $state.go('postsShow', $state.params);
    });
  }
}
