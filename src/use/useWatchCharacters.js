import {watch} from 'vue'

export function useWatchCharacters(valueToWatch, maxChars) {
    watch(valueToWatch, (newvalue) => {
        if (newvalue.length === maxChars) {
          alert(`only ${maxChars} characters allowed !!!`)
        }   
      })
}