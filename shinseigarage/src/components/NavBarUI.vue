<template>
    <!-- Hero -->
    <section class="et-hero-tabs">
      <h1>STICKY SLIDER NAV</h1>
      <h3>Sliding content with sticky tab nav</h3>

      <div class="et-hero-tabs-container" :class="{'et-hero-tabs-container--top': isSticky}">
        <a
          v-for="tab in tabs"
          :key="tab.id"
          class="et-hero-tab"
          :href="tab.href"
          @click.prevent="onTabClick(tab)"
        >{{ tab.name }}</a>
        <span class="et-hero-tab-slider" :style="{ width: sliderWidth, left: sliderLeft }"></span>
      </div>
    </section>
    <main class="et-main">
      <section v-for="tab in tabs" :key="tab.id" class="et-slide" :id="tab.id">
        <h1>{{ tab.name }}</h1>
        <h3>something about {{ tab.name }}</h3>
      </section>
    </main>
  </template>
  
  <script>
  import { reactive, onMounted, onBeforeUnmount, ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {

      const users = ref([]);

      axios.get('http://localhost:8000/usuarios')
        .then(response => {
          users.value = response.data;  // Atualizando o valor da referência
          console.log(users.value);  // Acessando o valor de users
        })
        .catch(error => {
          console.error('Erro ao buscar usuários:', error);
        });


      const state = reactive({
        currentId: null,
        currentTab: null,
        tabContainerHeight: 70,
        isSticky: false,
        sliderWidth: '0px',
        sliderLeft: '0px',
        tabs: [
          { id: 'tab-es6', href: '#tab-es6', name: 'ES6' },
          { id: 'tab-flexbox', href: '#tab-flexbox', name: 'Flexbox' },
          { id: 'tab-react', href: '#tab-react', name: 'React' },
          { id: 'tab-angular', href: '#tab-angular', name: 'Angular' },
          { id: 'tab-other', href: '#tab-other', name: 'Other' }
        ]
      });
  
      const onTabClick = (tab) => {
        const scrollTop = document.querySelector(tab.href).offsetTop - state.tabContainerHeight + 1;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      };
  
      const onScroll = () => {
        checkTabContainerPosition();
        findCurrentTabSelector();
      };
  
      const onResize = () => {
        if (state.currentId) {
          setSliderCss();
        }
      };
  
      const checkTabContainerPosition = () => {
        const tabContainer = document.querySelector('.et-hero-tabs');
        const offset = tabContainer.offsetTop + tabContainer.clientHeight - state.tabContainerHeight;
        state.isSticky = window.scrollY > offset;
      };
  
      const findCurrentTabSelector = () => {
        let newCurrentId;
        let newCurrentTab;
        state.tabs.forEach((tab) => {
          const section = document.querySelector(tab.href);
          const offsetTop = section.offsetTop - state.tabContainerHeight;
          const offsetBottom = section.offsetTop + section.clientHeight - state.tabContainerHeight;
  
          if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
            newCurrentId = tab.href;
            newCurrentTab = tab;
          }
        });
  
        if (state.currentId !== newCurrentId || state.currentId === null) {
          state.currentId = newCurrentId;
          state.currentTab = newCurrentTab;
          setSliderCss();
        }
      };
  
      const setSliderCss = () => {
        if (state.currentTab) {
          const tabElement = document.querySelector(`.et-hero-tab[href='${state.currentTab.href}']`);
          state.sliderWidth = tabElement.offsetWidth + 'px';
          state.sliderLeft = tabElement.offsetLeft + 'px';
        }
      };
  
      onMounted(() => {
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      });
  
      return {
        ...state,
        onTabClick
      };
    }
  };
  </script>
  
  <style scoped>
    body {
		font-family: "Century Gothic", 'Lato', sans-serif;
}

a {
	text-decoration: none;
}

.et-hero-tabs,
.et-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    background: #eee;
		text-align: center;
		padding: 0 2em;
    h1 {
        font-size: 2rem;
        margin: 0;
        letter-spacing: 1rem;
    }
    h3 {
        font-size: 1rem;
        letter-spacing: 0.3rem;
        opacity: 0.6;
    }
}

.et-hero-tabs-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 10;
    &--top {
        position: fixed;
        top: 0;
    }
}

.et-hero-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #000;
    letter-spacing: 0.1rem;
		transition: all 0.5s ease;
		font-size: 0.8rem;
	  &:hover {
			color:white;
      background: rgba(102,177,241,0.8);
			transition: all 0.5s ease;
    }
}

.et-hero-tab-slider {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 6px;
    background: #66B1F1;
    transition: left 0.3s ease;
}

@media (min-width: 800px) {
	.et-hero-tabs,
	.et-slide {
    h1 {
        font-size: 3rem;
    }
    h3 {
        font-size: 1rem;
    }
	}
	.et-hero-tab {
		font-size: 1rem;
	}
}
  </style>
  