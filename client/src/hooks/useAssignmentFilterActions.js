export default function useAssignmentFilterActions() {
    const filterAction = {
        OPEN: 0,
        CLOSED: 1
    };

    const assignmentFilterActions = [
        {
            id: filterAction.OPEN,
            text: 'Opened',
            button: {
                variant: active => (active ? 'outline-danger' : 'outline-primary')
            }
        },
        {
            id: filterAction.CLOSED,
            text: 'Closed',
            button: {
                variant: active => (active ? 'outline-danger' : 'outline-primary')
            }
        }
    ];

    return {
        assignmentFilterActions
    };
}
