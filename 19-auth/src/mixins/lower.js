export default {
    created() {
        console.log('mixin');
    },
    filters: {
        lower(val) {
            console.log(val);
            return val.toLowerCase();
        },
    },
};
