document.addEventListener('DOMContentLoaded', function () {
    // Set CSS rules from input field
    const flexContainer = document.querySelector('#flexContainer');
    const foregroundFlexContainer = document.querySelector(
        '.foreground-flex-container'
    );
    const taskFinished = document.querySelector('#taskFinished');

    function addEvListener() {
        const flexProperties = document.querySelectorAll('.flexProperties');

        for (let flexProperty of flexProperties) {
            flexProperty.addEventListener('input', () => {
                const item = flexProperty.name;
                let selItem;
                let selSelector;
                if (item === 'flexContainer') {
                    selItem = foregroundFlexContainer;
                    selSelector = flexContainer;
                } else {
                    selItem = document.querySelector(
                        `.foreground-item.${item}`
                    );
                    selSelector = document.querySelector(`#flex-${item}`);
                }
                const cleanFlexContainer = selSelector.value.replace(/\s/g, '');
                selItem.removeAttribute('style');
                const attributes = cleanFlexContainer.split(';');
                for (let attribute of attributes) {
                    const property = attribute.split(':')[0];
                    const value = attribute.split(':')[1];
                    selItem.style[property] = value;
                }

                // Check if items align

                const backgroundItems =
                    document.querySelectorAll('.background-item');
                const foregroundItems =
                    document.querySelectorAll('.foreground-item');

                areAligned = 0;
                for (let backgroundItem of backgroundItems) {
                    for (let foregroundItem of foregroundItems) {
                        if (
                            backgroundItem.classList[2] ===
                            foregroundItem.classList[2]
                        ) {
                            if (
                                backgroundItem.getBoundingClientRect().x ===
                                    foregroundItem.getBoundingClientRect().x &&
                                backgroundItem.getBoundingClientRect().y ===
                                    foregroundItem.getBoundingClientRect().y
                            ) {
                                areAligned++;
                            }
                        }
                    }
                }

                if (areAligned === backgroundItems.length) {
                    taskFinished.classList.remove('hidden');
                } else {
                    if (taskFinished) taskFinished.classList.add('hidden');
                }
            });
        }
    }

    addEvListener();
    // Create flex items
    const createFlexItemButtons = document.querySelectorAll('.createFlexItem');

    for (let createFlexItemButton of createFlexItemButtons) {
        createFlexItemButton.addEventListener('click', function () {
            const flexItem = document.querySelector(
                `.foreground-item.item-${this.id}`
            );
            if (flexItem) {
                deleteFlexItem(flexItem);
            } else {
                createFlexItem(this.id);
            }
        });
    }

    const createFlexItem = (className) => {
        //create Item
        const item = document.createElement('div');
        item.classList.add('item');
        item.classList.add('foreground-item');
        item.classList.add('item-' + className);
        item.innerHTML = className;
        foregroundFlexContainer.appendChild(item);

        //create instructions
        const instructions = document.createElement('div');
        instructions.classList.add('instructions');
        instructions.classList.add(`instructions-item-${className}`);
        instructions.innerHTML = `
            <label class="selector" for="flexItem">
                Flex-item-${className} {
            </label>
            <textarea name="item-${className}" id="flex-item-${className}" cols="30" rows="10" class="flexProperties"></textarea>
            <div class="selector">}</div> 
            `;
        document
            .querySelector('.instructionsContainer')
            .appendChild(instructions);

        addEvListener();
    };

    const deleteFlexItem = (item) => {
        //delete item
        item.remove();
        //delete instructions
        const instructions = document.querySelector(
            `.instructions.instructions-${item.classList[2]}`
        );
        instructions.remove();
    };

    // const flexItem = document.querySelector('#flexItem');
    // const foregroundItems = document.querySelectorAll('.foreground-item');
    // flexItem.addEventListener('input', () => {
    //     const cleanFlexItem = flexItem.value.replace(/\s/g, '');
    //     const attributes = cleanFlexItem.split(';');
    //     for (let attribute of attributes) {
    //         const property = attribute.split(':')[0];
    //         const value = attribute.split(':')[1];
    //         foregroundFlexContainer.style[property] = value;
    //         for (let foregroundItem of foregroundItems) {
    //             foregroundItem.removeAttribute('style');
    //             foregroundFlexItem.style[property] = value;
    //         }
    //     }
    // });
});
