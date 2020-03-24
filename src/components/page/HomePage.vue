<template>
    <div class="picture" :style="backgroundDiv">
    </div>

</template>

<script>
    export default {
        data() {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../../assets/img/bg.png') + ')'
                }
            }
        }
    }
</script>

<style>
    .picture {
        height: 600px;
        width: 1100px;
        background: no-repeat center top;
        background-size: contain;
    }
</style>
