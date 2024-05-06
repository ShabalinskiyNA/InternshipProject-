import * as React from "react";

class TableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellData: this.props.cellData,
            showContextMenu: false,
            contextMenuPosition: { top: 0, left: 0 }
        };
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <td
                key={this.state.cellData.rowId + " " + this.state.cellData.columId}
                style={{ border: '1px solid black' }}
                onContextMenu={this.handleContextMenu}
                onMouseLeave={this.handleClick}>

                <input
                    type="text"
                    name={this.props.cellData.data.slice()}
                    defaultValue={this.state.cellData.data.slice()}
                    style={{ border: 'none', outline: 'none' }}
                    onBlur={(event) =>
                        this.props.onCellClick(
                            event.target.value,
                            this.state.cellData.columId,
                            this.state.cellData.rowId,
                        )}

                />
                {this.renderContextMenu()}
            </td>
        );
    };

    handleContextMenu = (event) => {
        event.preventDefault();
        this.setState({
            showContextMenu: true,
            contextMenuPosition: { top: event.clientY, left: event.clientX }
        });
    }

    handleClick() {
        this.setState({ showContextMenu: false });
    }

    renderContextMenu() {
        if (!this.state.showContextMenu) return null;
        return (
            <>
                <div style={{
                    display: 'flex', // делаем div гибким контейнером
                    justifyContent: 'center', // центрируем содержимое по горизонтали
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.state.contextMenuPosition.top,
                    left: this.state.contextMenuPosition.left,
                    backgroundColor: '#AFEEEE', // персиковый цвет
                    border: '1px solid #C0C0C0',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', // тень для глубины
                    zIndex: '1000', // чтобы меню было поверх других элементов
                    padding: '0px',
                    height: '50px'
                }}>
                    <ul style={{
                        backgroundColor: '#AFEEEE',
                        listStyleType: 'none', // убираем маркеры списка
                        padding: '0px' // добавляем отступы вокруг элементов списка
                    }}>
                        <li >
                            <button
                                style={{
                                    display: 'block',  // делаем кнопку блочным элементом
                                    width: '100%',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    backgroundColor: '#E0FFFF',
                                    fontSize: '13px'
                                }}
                                onClick={() => this.props.onDelColClick(this.state.cellData.columId)}>
                                Delete column
                            </button>
                        </li>
                        <li >
                            <button
                                style={{
                                    display: 'block',  // делаем кнопку блочным элементом
                                    width: '100%',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    backgroundColor: '#E0FFFF',
                                    fontSize: '13px'
                                }}


                            >
                                Delete row
                            </button>
                        </li>
                    </ul>
                </div>

            </>

        );
    }

}

export default TableCell;