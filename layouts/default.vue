<template>
	<div>
    <Header/>
    <Navbar/>
		<div>
			<nuxt/>
		</div>
	</div>
</template>

<script>

import Header from '../components/Header.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
		Navbar,
    Header,
	},
};

</script>
