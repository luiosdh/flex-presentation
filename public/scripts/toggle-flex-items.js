document.addEventListener('DOMContentLoaded', function () {
    const createFlexItemButtons = document.querySelectorAll('.createFlexItem');

    for (let createFlexItemButton of createFlexItemButtons) {
        createFlexItemButton.addEventListener('click', function () {
            const flexItem = document.querySelector(
                `.managed-item.item-${this.id}`
            );
            if (flexItem) {
                deleteFlexItem(flexItem);
                deleteFlexInstructions(flexItem);
                setCssRulesFromInputField();
            } else {
                createFlexItem(this.id);
                createFlexInstruction(this.id);
            }
        });
    }

    function createFlexItem(className) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.classList.add('managed-item');
        item.classList.add('item-' + className);
        item.innerHTML = className;
        const managedFlexContainer = document.querySelector(
            '.managed-flex-container'
        );
        managedFlexContainer.appendChild(item);
    }

    function createFlexInstruction(className) {
        const instructions = document.createElement('div');
        instructions.classList.add('instructions');
        instructions.classList.add(`instructions-item-${className}`);
        instructions.innerHTML = `
            <label class="selector" for="flexItem">
                Flex-item-${className} {
            </label>
            <textarea name="item-${className}" id="flex-item-${className}" cols="30" rows="10" class="flexElement"></textarea>
            <div class="selector">}</div> 
            `;
        document
            .querySelector('#flex-items-input-container')
            .appendChild(instructions);
    }

    const deleteFlexItem = (item) => {
        item.remove();
    };

    const deleteFlexInstructions = (item) => {
        const instructions = document.querySelector(
            `.instructions.instructions-${item.classList[2]}`
        );
        instructions.remove();
    };
});
