miro.onReady(() => {
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'Sync Align Tags',
          svgIcon:
            '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          positionPriority: 1,
          onClick: async () => {

                await update_align_tags();

            // Show success message
            miro.showNotification('Align Update Complete')
          },
        },
      },
    })
  })