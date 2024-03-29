import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  language: getLanguage(),
  device: 'desktop',
  fullScreen: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_FULLSCREEN: (state, fullScreen) => {
    state.fullScreen = fullScreen
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleFullScreen({ commit }, fullScreen) {
    commit('TOGGLE_FULLSCREEN', fullScreen)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
