import Vue from 'vue'

const properties = {
    isDesktop() {
        return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)
    },
    range(n) {
        return [...Array(n).keys()]
    },
    scrollTo(el, top) {
        setTimeout(() => {
            el.scrollTop = top ? 0 : el.scrollHeight
        }, 0)
    }
}

Object.entries(properties).forEach(prop => {
    Vue.prototype['$' + prop[0]] = prop[1]
})