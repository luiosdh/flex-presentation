document.addEventListener('DOMContentLoaded', function () {
    function setCssRulesFromInputField() {
        const flexElementsRules =
            document.querySelectorAll('.flexElementRules');

        for (let flexElementRule of flexElementsRules) {
            flexElementRule.addEventListener('input', () => {
                const targetElementId = flexElementRule.name;
                selectAndStyleElement(targetElementId);

                const finishTaskNotification = document.querySelector(
                    '#finishTaskNotification'
                );
                if (managedItemsPositionsAreCorrect()) {
                    finishTaskNotification.classList.remove('hidden');
                } else {
                    if (finishTaskNotification)
                        finishTaskNotification.classList.add('hidden');
                }
            });
        }
    }

    setCssRulesFromInputField();

    function selectAndStyleElement(targetElementId) {
        if (targetElementId === 'flexContainer') {
            const flexContainerRules = document.querySelector(
                '#flexContainerRules'
            );
            const managedFlexContainer = document.querySelector(
                '.managed-flex-container'
            );
            styleFlexElement(managedFlexContainer, flexContainerRules);
        } else {
            const managedFlexItem = document.querySelector(
                `.managed-item.${targetElementId}`
            );
            const flexItemRules = document.querySelector(
                `#flex-${targetElementId}`
            );
            styleFlexElement(managedFlexItem, flexItemRules);
        }
    }

    function styleFlexElement(element, rules) {
        element.removeAttribute('style');
        rulesArray = cleanRules(rules).split(';');
        for (let rule of rulesArray) {
            addRuleToElement(rule, element);
        }
    }

    function cleanRules(rules) {
        return rules.value.replace(/\s/g, '');
    }

    function addRuleToElement(rule, element) {
        const key = rule.split(':')[0];
        const value = rule.split(':')[1];
        element.style[key] = value;
    }

    function managedItemsPositionsAreCorrect() {
        const exampleItems = document.querySelectorAll('.example-item');
        const managedItems = document.querySelectorAll('.managed-item');
        itemsAligned = 0;
        exampleItems.forEach(function (exampleItem) {
            managedItems.forEach(function (managedItem) {
                if (
                    itemsCorrespondToEachOther(exampleItem, managedItem) &&
                    itemsAreAligned(exampleItem, managedItem)
                )
                    itemsAligned++;
            });
        });
        return itemsAligned === exampleItems.length ? true : false;
    }

    function itemsCorrespondToEachOther(exampleItem, managedItem) {
        const exampleItemId = exampleItem.classList[2];
        const managedItemId = managedItem.classList[2];
        if (exampleItemId === managedItemId) return true;
        else return false;
    }

    function itemsAreAligned(exampleItem, managedItem) {
        if (
            exampleItem.getBoundingClientRect().x ===
                managedItem.getBoundingClientRect().x &&
            exampleItem.getBoundingClientRect().y ===
                managedItem.getBoundingClientRect().y
        ) {
            return true;
        } else {
            return false;
        }
    }
});
