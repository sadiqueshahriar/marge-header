<template>
	<div>
		<navbar></navbar>
		<div>
			<nuxt/>
		</div>
	</div>
</template>

<script>

import navbar from '~/components/Adminnavbar'

export default {
	components: {
		navbar,
	}
}

</script>
