async function update_align_tags() {
    
    const app_id = 3074457357820457132n;

    MIRO_COLORS = {'Yellow': '#fff9b1',
        'White': '#f5f6f8',
        'Light Orange': '#f5d128',
        'Olive': '#d0e17a',
        'Green': '#d5f692',
        'Pastel Blue': '#a6ccf5',
        'Aqua':'#67c6c0',
        'Blue': '#23bfe7',
        'Orange': '#ff9d48',
        'Pink': '#ea94bb',
        'Red': '#f16c7f',
        'Purple': '#b384bb'};

    STATUS = {
            "Not Set" : "#fff9b1",
            "Medium" : "#ff9d48",
            "Low"  :  "#d0e17a",
            "High" : "#f16c7f",
            "Critical" : "#b384bb"
        };

    FEATURE_STATUS = { 
        0:  [MIRO_COLORS['Yellow'], 'Pending Approval']
    ,1:  [MIRO_COLORS['Olive'], 'Ready to Start']
    ,2:  [MIRO_COLORS['Green'], 'In Progress']
    ,3:  [MIRO_COLORS['Aqua'], 'Dev Complete']
    ,4:  [MIRO_COLORS['Aqua'], 'Test Complete']
    ,5:  [MIRO_COLORS['White'], 'Accepted']};



    let pi_tags = {};

    function validateSticker ( item, index, arr)  {
        let pi = '';
        let status='';
        let priority='';

        if (app_id in item.metadata) {
            pi = item.metadata[app_id].pi;
            if (pi != undefined) {
                if (!(pi in pi_tags)){
                    pi_tags[pi] = {};
                    pi_tags[pi]['color'] = '#F24726';                
                    pi_tags[pi]['widgets'] = [];
                }
                pi_tags[pi]['widgets'].push(item.id);
            }
            status = item.metadata[app_id].status;
            if (status != undefined) {
                if (!(status in pi_tags)){
                    pi_tags[status] = {};
                    pi_tags[status]['color'] = '#b384bb';                
                    pi_tags[status]['widgets'] = [];
                }
                pi_tags[status]['widgets'].push(item.id);
            }
            priority = item.metadata[app_id].priority;
            if (priority != undefined) {
                if (!(priority in pi_tags)){
                    pi_tags[priority] = {};
                    pi_tags[priority]['color'] = '#ff9d48';                
                    pi_tags[priority]['widgets'] = [];
                }
                pi_tags[priority]['widgets'].push(item.id);
            }
        }
    }

    await miro.board.widgets.get({type: "sticker"}).then((theWidgets) => theWidgets.forEach( validateSticker) );

    let miro_tags = await miro.board.tags.get();
    console.log(miro_tags);

    for (tag in miro_tags) {
        console.log(miro_tags[tag]);

        if (miro_tags[tag].title in pi_tags){
            await miro.board.tags.delete({id:miro_tags[tag].id});
        }
    }

    for (tag in pi_tags) {
        await miro.board.tags.create({title: tag, color: pi_tags[tag]['color'],  widgetIds: pi_tags[tag]['widgets']});
    }

    miro_tags = await miro.board.tags.get();
    console.log(miro_tags);
}