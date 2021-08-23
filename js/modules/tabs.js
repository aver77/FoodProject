/*export*/ function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass) {
    const tabsWrapper = document.querySelector(tabsParentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    hide();
    show();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1)))
        {
            let i=0;
            for (i;i<tabs.length;i++)
            {
                if (tabs[i] == target)
                    break;
            }
            hide();
            show(i);
        }

    })

    function hide() 
    {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        })
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function show(i = 0) 
    {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
}

export default tabs;