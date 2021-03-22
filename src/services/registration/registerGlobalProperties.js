import Vue from 'vue'

const properties = {
    isDesktop() {
        return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)
    }
}

Object.entries(properties).forEach(prop => {
    Vue.prototype['$' + prop[0]] = prop[1]
})