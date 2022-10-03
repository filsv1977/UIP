export default function useAssignmentFilterActions() {
    const filterAction = {
        OPEN: 0,
        CLOSED: 1
    };

    const assignmentFilterActions = [
        {
            id: filterAction.OPEN,
            text: 'Opened',
            meta: {
                query: '?closed=0'
            },
            button: {
                variant: active => (active ? 'outline-danger' : 'outline-primary')
            }
        },
        {
            id: filterAction.CLOSED,
            text: 'Closed',
            meta: {
                query: '?closed=1'
            },
            button: {
                variant: active => (active ? 'outline-danger' : 'outline-primary')
            }
        }
    ];

    return {
        assignmentFilterActions
    };
}
