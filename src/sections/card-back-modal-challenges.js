const init = async () => {

    const onLabelClick = async t => {

        return t.popup
    };

    return {
        title: 'My Card Back Section',
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html'),
          height: 230, // Max height is 1500.
          action: {
            text: 'My Action',
            callback: t => onLabelClick(t)
          },
        }
    }

};

init();