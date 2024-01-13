<template>
    <div class="component-icon">
       <template v-if="file === 'svg'">
            <zui-svg-icon 
                :class="iconTypeClasses" 
                :icon="type"
                :width="width"
                :height="height"
                :color="color"
            >
            </zui-svg-icon>
        </template>
        <template v-else-if="file === 'img'">
            <image 
                :src="src"
            ></image>
        </template>
        <template v-else>
            <uni-icons 
                :size="size"
                :type="type"
                :color="color"
                :fontFamily="fontFamily"
            ></uni-icons>
        </template>
    </div>
</template>

<script>
export default {
    name: 'icons',
    props: {
        file: {
            type: String,
            default:()=>'font'
        },
        src: {
            type: String,
            default: undefined
        },
        type:{
            type: String,
            default: undefined
        },
        color:{
            type:String,
            default:undefined
        },
        fontFamily:{
            type:String,
            default:undefined
        },
        width:{
            type:[String,Number],
            default:undefined
        },
        height:{
            type:[String,Number],
            default:undefined
        },
        size:{
            type:[String,Number],
            default:24
        }
    }
};
</script>

<style scoped>
</style>
