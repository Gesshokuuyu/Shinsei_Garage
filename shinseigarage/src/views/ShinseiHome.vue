<template>
    <div>
      <ShinseiHeader />
      <AboutSection />
      <FeaturedCars />
      <ServicesSection />
      <ShinseiTestimonials />
      <CallToAction />
      <ShinseiFooter />
    </div>
  </template>
  
  <script>
  import ShinseiHeader from '@/components/ShinseiHeader.vue';
  import AboutSection from '@/components/AboutSection.vue';
  import FeaturedCars from '@/components/FeaturedCars.vue';
  import ServicesSection from '@/components/ServicesSection.vue';
  import ShinseiTestimonials from '@/components/ShinseiTestimonials.vue';
  import CallToAction from '@/components/CallToAction.vue';
  import ShinseiFooter from '@/components/ShinseiFooter.vue';
  
  export default {
    name: 'ShinseiHome',
    components: {
      ShinseiHeader,
      AboutSection,
      FeaturedCars,
      ServicesSection,
      ShinseiTestimonials,
      CallToAction,
      ShinseiFooter
    }
  };
  </script>
  