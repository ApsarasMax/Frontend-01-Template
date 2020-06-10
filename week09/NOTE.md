# 每周总结可以写在这里

### General



*   CSS属性
    *   3 categories: layout, drawing, animation
    *   animation
        *   @keyframes
        *   cubic-bezier curve
            *   “ease” is recommended
        *   CSS animation is way better than gif
    *   color:
        *   RGB & CMYK
        *   HSL & HSV
*   HTML
    *   nbsp vs white space
        *   don’t use &nbsp, use white space for showing multiple spaces
            *   &lt;div style=”white-space:pre-wrap”>a       b&lt;/div>
*   Browser API
    *   DOM
        *   DOM Tree
            *   Node
                *   Element
                    *   HTML
                    *   SVG
                *   Document
                *   CData
                *   DocumentFragment
                *   DocumentType
        *   Events
            *   document.body.addEventListener("click", {handleEvent: function(){console.log('hi')}})
            *   capture and bubble
                *   when event happens, it is first captured by the most outside element’s listener, and then passed to inside listeners
                *   after listener capturing the event, the handler will be executed from inside to outside like bubbling
        *   Range
    *   CSSOM
    *   BOM
    *   Web Animation
    *   Crypto
    *   ...
