<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
        <img src="../../assets/Images/corona.jpg" class="img-fluid logo" alt="Responsive image" height="150" width="150">
        <a class="navbar-brand pl-3" href="#" id="Title" style="font-size: 2em;">CovidTracker</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto pr-5">
            <li class="nav-item active">
              <a class="nav-link" href="#">Map </a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" >Covid Awarness</a>
            </li>
        </ul>
        </div>
    </nav>
</template>
<style scoped>
</style>
<script>
export default{
    methods: {
      loadAwarness:function(){
        this.$parent.loadAwarness();
      }
    },

};
</script>
