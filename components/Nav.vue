<template>
  <nav class="d-flex justify-content-between align-items-center sticky-top">
    <a id="logo" class="fs-2rem ms-3" href="#"><img src="~/assets/img/Greek_Alpha_classical.svg"
        style="width: 2rem"></a>

    <div id="menu">
      <root />
    </div>
    <div id="overlay">
      <div id="mobile-sidebar" class="">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
        <div v-for="item in s" :key="item.id" @click="childClick">{{ item.name }}</div>
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
function childClick() {
  alert('ss');
}
let root;
let s;
const forest = (xs, build, isChild, root) => xs.filter(x => isChild(root, x)).map(node => build(node, root => forest(xs, build, isChild, root)));
try {
  // const { data } = await ShopRepository.findTags();
  // console.log(data);
  let data = [
    { id: 1, name: 'Man', fatherId: null, andCondition: null },
    { id: 2, name: 'Women', fatherId: null, andCondition: null },
    { id: 3, name: 'Kid', fatherId: null, andCondition: null },
    { id: 4, name: 'Shop By Sport', fatherId: 1, andCondition: null },
    { id: 5, name: 'Shoes', fatherId: 1, andCondition: null },
    { id: 6, name: 'Clothing', fatherId: 1, andCondition: null },
    { id: 7, name: 'Color', fatherId: 1, andCondition: true },
    { id: 8, name: 'Price', fatherId: 1, andCondition: true },
    { id: 9, name: 'Red', fatherId: 7, andCondition: null },
    { id: 10, name: 'Green', fatherId: 7, andCondition: null },
    { id: 11, name: 'Blue', fatherId: 7, andCondition: null },
    { id: 12, name: 'Running', fatherId: 4, andCondition: null },
    { id: 13, name: 'Football', fatherId: 4, andCondition: null }
  ];

  s = forest(
    data,
    ({ id, fatherId, ...rest }, f) => ({ id, ...rest, children: f(id) }),
    (id, { fatherId }) => fatherId == id,
    null
  )
  console.log(s);

  root = h('ul', { class: 'd-flex mb-0' }, [s.map(item => {
    return h('li', { class: 'dropdown ms-3' }, [
      h(NuxtLink, { to: '/list/' + item.id, class: 'text-black hover-line' }, [item.name]),
      (item.children.length > 0 && item.andCondition != true) ?
        h('ul', { class: 'dropdown-menu-1 flex-wrap justify-content-center align-items-start border-bottom' }, [item.children.map(i => {
          if (i.andCondition == true) return null;
          else
            return h('li', { class: 'm-2', style: { width: '150px' } }, [
              h(NuxtLink, { to: '/list/' + i.id, class: 'text-black' }, [i.name]),


              (i.children.length > 0 && i.andCondition != true) ?
                h('ul', [i.children.map(i => {
                  return h('li', { class: ' ' }, [
                    h(NuxtLink, { to: '/list/' + i.id, class: 'text-black-50' }, [i.name])
                  ])
                })])
                : null

            ])

        })]) : null

    ])
  })])
} catch (error) {
  console.log(error);
}



</script>
<style scoped>
:deep(.hover-line:hover) {
  font-weight: bold;
}

:deep(ul) {
  padding: 0;
  list-style-type: none;
}

:deep(a) {
  text-decoration: none;
}


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

.lh-3rem {
  line-height: 3rem;
}

:deep(.dropdown:hover .dropdown-menu-1) {
  display: flex;
  margin-top: 0;
}

:deep(.dropdown-menu-1) {
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