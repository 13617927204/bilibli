<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
     <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>
<script>
import {} from '@vue/composition-api'
export default {

}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

ul li, ol li {
  list-style: none;
}

img {
  display: block;
}

.l {
  float: left;
}

.r {
  float: right;
}

a {
  text-decoration: none;
  color: #616161;
}
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
</style>
