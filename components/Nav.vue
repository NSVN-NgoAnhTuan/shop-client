<template>
  <nav class="d-flex justify-content-between align-items-center sticky-top">
    <a id="logo" class="fs-2rem ms-3" href="#"><img src="~/assets/img/Greek_Alpha_classical.svg"
        style="width: 2rem"></a>

    <div id="menu">
      <!-- <ul class="d-flex mb-0"> -->
      <root />
      <!-- <li class="nav-item dropdown">
          <a class="nav-link lh-3rem" href="#">Man</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link disabled lh-3rem" href="#">Women</a>
          <ul class="dropdown-menu-1 flex-wrap justify-content-center">
            <li>
              <a class="dropdown-item" href="#">Women Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Women action</a></li>
                <li><a class="dropdown-item" href="#">Women action</a></li>
                <li><a class="dropdown-item" href="#">Women action</a></li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle-1 lh-3rem" href="#">Kids</a>
          <ul class="dropdown-menu-1 1 flex-wrap justify-content-center">
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">Action</a>
              <ul>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
          </ul>
        </li> -->
      <!-- </ul> -->
    </div>
    <div id="overlay">
      <div id="mobile-sidebar" class="">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div class="position-relative d-flex">
      <input id="search-input" type="text" class="position-absolute form-control" placeholder="Search"
        :class="[isSearching ? 'search-input' : 'w-0']" @keyup.enter="search" @blur="hideSearchInput"
        ref="searchInputRef">
      <span id="search-icon" class="icon-magnifier fs-2rem me-3 zindex-2" role="button" tabindex="0"
        @click="toggleSearchInput"></span>
      <span id="bag-icon" class="icon-bag fs-2rem me-3" role="button"></span>
      <span id="menu-icon" class="icon-menu fs-2rem me-3" role="button" @click="openNav"></span>

    </div>
  </nav>
</template>
<script setup lang="ts">
import NuxtLink from '../node_modules/nuxt/dist/app/components/nuxt-link';
import { RepositoryFactory } from '../repositories/RepositoryFactory'
const ShopRepository = RepositoryFactory.get('shop')

const searchInputRef = ref(null)
const isSearching = ref(false)

function search() {
  console.log('search')
}
function toggleSearchInput() {
  if (isSearching.value) {
    search()
  } else {
    isSearching.value = !isSearching.value
    searchInputRef.value.focus()
  }

}
function hideSearchInput(e) {
  if (!e.relatedTarget || e.relatedTarget.id != 'search-icon') isSearching.value = false
  else searchInputRef.value.focus()
}

function openNav() {
  document.getElementById("mobile-sidebar").style.width = "250px";
  document.getElementById("overlay").style.width = "100vw";
}
function closeNav() {
  document.getElementById("mobile-sidebar").style.width = "0";
  document.getElementById("overlay").style.width = "0";
}

let root;
const forest = (xs, build, isChild, root) => xs.filter(x => isChild(root, x)).map(node => build(node, root => forest(xs, build, isChild, root)));
try {
  const { data } = await ShopRepository.findTags();
  console.log(data);
  let s = forest(
    data,
    ({ id, fatherId, ...rest }, f) => ({ id, ...rest, children: f(id) }),
    (id, { fatherId }) => fatherId == id,
    null
  )
  console.log(s);

  root = () => {
    if (s.children.length) {
      return h('ul', this.items.map(function (item) {
        return h('li', item.name)
      }))
    } else {
      return h('p', 'No items found.')
    }
  }

  root = h('ul', { class: 'd-flex mb-0' }, [s.map(item => {
    return h('li', { class: 'nav-item dropdown' }, [
      h(NuxtLink, { to: '/' + item.id }, () => [item.name]),
      (item.children.length > 0 && item.andCondition != true) ?
        h('ul', { class: 'dropdown-menu-1 flex-wrap justify-content-center' }, [item.children.map(i => {
          return h('li', { class: 'nav-item dropdown' }, [
            (i.andCondition != true) ?
              h(NuxtLink, { to: '/' + i.id }, () => [i.name]) : null,
            (i.children.length > 0 && i.andCondition != true) ?
              h('ul', { class: 'dropdown-menu-1 flex-wrap justify-content-center' }, [i.children.map(i => {
                return h('li', { class: 'nav-item dropdown' }, [
                  h(NuxtLink, { to: '/' + i.id }, () => [i.name]),
                ])
              })]) : null
          ])
        })]) : null

    ])
  })])
} catch (error) {
  console.log(error);
}



</script>
<style scoped>
#overlay {
  width: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 4;
  top: 0;
  backdrop-filter: blur(4px);

}

#mobile-sidebar {
  height: 100%;
  width: 0;
  /* 0 width - change this with JavaScript */
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  background-color: #fff;
  overflow-x: hidden;
  /* Disable horizontal scroll */
  padding-top: 60px;
  transition: 0.5s;
  /* 0.5 second transition effect to slide in the sidenav */
}

#mobile-sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

#mobile-sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.w-0 {
  width: 0;
  border-color: white;
}

ul {
  list-style-type: none;
}

.lh-3rem {
  line-height: 3rem;
}

.dropdown:hover .dropdown-menu-1 {
  display: flex;
  margin-top: 0;
}

.dropdown-menu-1 {
  position: fixed;
  display: none;
  width: 100vw;
  left: 0;
  background-color: white;
}

.fs-2rem {
  font-size: 2rem;
}

.zindex-2 {
  z-index: 2;
}

#menu-icon {
  display: none;
}

.search-input {
  margin-top: -0.2rem;
  right: 3.5rem;
  z-index: 1;
  width: 15rem;
}

@media only screen and (max-width: 800px) {
  #menu-icon {
    display: block;
  }

  #menu {
    display: none;
  }

  .search-input {
    right: 6.5rem;
    width: calc(100vw - 10rem);
  }
}
</style>