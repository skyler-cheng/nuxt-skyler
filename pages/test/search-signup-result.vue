<template>
    <div>
		<h1>六角報名查詢</h1>
        
        {{ $store.state.result }}
    </div>
</template>

<script>
import axios from 'axios';

export default {
    created() {
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'YUOR_AUTH_TOKEN';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    },
	/* 查詢 hexsholl@test.com 有無報名 theF2E 挑戰賽 */

	async asyncData() {

		let { data } = await axios.post('https://www.thef2e.com/api/isSignUp', {

            "email": "hexscholl@test.com"

        });
        
        store.commit('setResult', data);

	},
    /*
    fetch ({ store, params }) {
        return axios.post('https://www.thef2e.com/api/isSignUp', {
            "email": "hexscholl@test.com"
        })
        .then((res) => {
            store.commit('setResult', res.data);
        })
    }
    */
}
</script>