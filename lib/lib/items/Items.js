'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _utils = require('../utils.js');

var _generic = require('../utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import ItemGroup from './ItemGroup'

var canResizeLeft = function canResizeLeft(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
  return value === 'left' || value === 'both';
};

var canResizeRight = function canResizeRight(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
  return value === 'right' || value === 'both' || value === true;
};

var Items = function (_Component) {
  _inherits(Items, _Component);

  function Items() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Items);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Items.__proto__ || Object.getPrototypeOf(Items)).call.apply(_ref, [this].concat(args))), _this), _this.itemDrag = function () {
      var _this2;

      return (_this2 = _this).__itemDrag__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.itemDrop = function () {
      var _this3;

      return (_this3 = _this).__itemDrop__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Items, [{
    key: '__itemDrop__REACT_HOT_LOADER__',
    value: function __itemDrop__REACT_HOT_LOADER__(itemId, dragTimeDelta, oldGroupOrder, dragGroupDelta) {
      var _this4 = this;

      var _props$keys = this.props.keys,
          itemIdKey = _props$keys.itemIdKey,
          itemGroupKey = _props$keys.itemGroupKey,
          itemTimeStartKey = _props$keys.itemTimeStartKey;


      var groupOrders = (0, _utils.getGroupOrders)(this.props.groups, this.props.keys);

      var itemChanges = this.props.selectedItems.map(function (selectedItemId) {
        var item = _this4.props.items.find(function (itemObj) {
          return (0, _generic._get)(itemObj, itemIdKey) === selectedItemId;
        });
        var order = groupOrders[(0, _generic._get)(item, itemGroupKey)];

        return {
          itemId: selectedItemId,
          dragTime: (0, _generic._get)(item, itemTimeStartKey) + dragTimeDelta,
          order: order,
          dragGroupDelta: dragGroupDelta
        };
      });

      this.props.itemDrop(itemChanges);

      this.setState({
        isDraggingItem: false,
        dragTimeDelta: 0,
        infoLabel: null
      });
    }
  }, {
    key: '__itemDrag__REACT_HOT_LOADER__',
    value: function __itemDrag__REACT_HOT_LOADER__(itemId, dragTimeDelta, oldGroupOrder, dragGroupDelta) {
      this.props.itemDrag(itemId, dragTimeDelta, oldGroupOrder, dragGroupDelta);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.items, this.props.items) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      //  nextProps.canvasTimeEnd === this.props.canvasTimeEnd && // Removed as not actually needed and causes issues with drag scroll updates
      nextProps.canvasWidth === this.props.canvasWidth && (0, _generic.arraysEqual)(nextProps.selectedItems, this.props.selectedItems) && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.canSelect === this.props.canSelect && nextProps.dimensionItems === this.props.dimensionItems && nextProps.topOffset === this.props.topOffset);
    }

    // TODO: this is exact same function as utility

  }, {
    key: 'getGroupOrders',
    value: function getGroupOrders() {
      var groupIdKey = this.props.keys.groupIdKey;


      var groupOrders = {};

      for (var i = 0; i < this.props.groups.length; i++) {
        groupOrders[(0, _generic._get)(this.props.groups[i], groupIdKey)] = i;
      }

      return groupOrders;
    }
  }, {
    key: 'isSelected',
    value: function isSelected(itemId) {
      return this.props.selectedItems.indexOf(itemId) > -1;
    }

    // TODO: this is exact same logic as utility function

  }, {
    key: 'getVisibleItems',
    value: function getVisibleItems(canvasTimeStart, canvasTimeEnd) {
      var _props$keys2 = this.props.keys,
          itemTimeStartKey = _props$keys2.itemTimeStartKey,
          itemTimeEndKey = _props$keys2.itemTimeEndKey;


      return this.props.items.filter(function (item) {
        return (0, _generic._get)(item, itemTimeStartKey) <= canvasTimeEnd && (0, _generic._get)(item, itemTimeEndKey) >= canvasTimeStart;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          dimensionItems = _props.dimensionItems;
      var _props$keys3 = this.props.keys,
          itemIdKey = _props$keys3.itemIdKey,
          itemGroupKey = _props$keys3.itemGroupKey;


      var groupOrders = this.getGroupOrders();
      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
      var sortedDimensionItems = (0, _generic.keyBy)(dimensionItems, 'id');

      return _react2.default.createElement(
        'div',
        { className: 'rct-items' },
        visibleItems.filter(function (item) {
          return sortedDimensionItems[(0, _generic._get)(item, itemIdKey)];
        }).map(function (item) {
          var itemId = (0, _generic._get)(item, itemIdKey);
          var selected = _this5.isSelected(itemId);
          return _react2.default.createElement(_Item2.default, { key: itemId,
            item: item,
            keys: _this5.props.keys,
            order: groupOrders[(0, _generic._get)(item, itemGroupKey)],
            dimensions: sortedDimensionItems[(0, _generic._get)(item, itemIdKey)].dimensions,
            selected: selected,
            canChangeGroup: (0, _generic._get)(item, 'canChangeGroup') !== undefined ? (0, _generic._get)(item, 'canChangeGroup') : _this5.props.canChangeGroup,
            canMove: (0, _generic._get)(item, 'canMove') !== undefined ? (0, _generic._get)(item, 'canMove') : _this5.props.canMove,
            canResizeLeft: canResizeLeft(item, _this5.props.canResize),
            canResizeRight: canResizeRight(item, _this5.props.canResize),
            canSelect: (0, _generic._get)(item, 'canSelect') !== undefined ? (0, _generic._get)(item, 'canSelect') : _this5.props.canSelect,
            useResizeHandle: _this5.props.useResizeHandle,
            topOffset: _this5.props.topOffset,
            groupHeights: _this5.props.groupHeights,
            groupTops: _this5.props.groupTops,
            canvasTimeStart: _this5.props.canvasTimeStart,
            canvasTimeEnd: _this5.props.canvasTimeEnd,
            canvasWidth: _this5.props.canvasWidth,
            dragSnap: _this5.props.dragSnap,
            minResizeWidth: _this5.props.minResizeWidth,
            onResizing: _this5.props.itemResizing,
            onResized: _this5.props.itemResized,
            moveResizeValidator: _this5.props.moveResizeValidator,
            onDragStart: _this5.props.itemDragStart,
            onDrag: _this5.itemDrag,
            onDrop: _this5.itemDrop,
            onItemDoubleClick: _this5.props.onItemDoubleClick,
            onContextMenu: _this5.props.onItemContextMenu,
            onSelect: _this5.props.itemSelect,
            onMouseUp: _this5.props.onMouseUp,
            itemRenderer: _this5.props.itemRenderer });
        })
      );
    }
  }]);

  return Items;
}(_react.Component);

Items.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,

  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,

  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  selectedItems: _propTypes2.default.array,

  canChangeGroup: _propTypes2.default.bool.isRequired,
  canMove: _propTypes2.default.bool.isRequired,
  canResize: _propTypes2.default.oneOf([true, false, 'left', 'right', 'both']),
  canSelect: _propTypes2.default.bool,

  keys: _propTypes2.default.object.isRequired,

  moveResizeValidator: _propTypes2.default.func,
  itemSelect: _propTypes2.default.func,
  itemDragStart: _propTypes2.default.func,
  itemDrag: _propTypes2.default.func,
  itemDrop: _propTypes2.default.func,
  itemResizing: _propTypes2.default.func,
  itemResized: _propTypes2.default.func,

  onItemDoubleClick: _propTypes2.default.func,
  onItemContextMenu: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,

  itemRenderer: _propTypes2.default.func
};
var _default = Items;
exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(canResizeLeft, 'canResizeLeft', 'src/lib/items/Items.js');

  __REACT_HOT_LOADER__.register(canResizeRight, 'canResizeRight', 'src/lib/items/Items.js');

  __REACT_HOT_LOADER__.register(Items, 'Items', 'src/lib/items/Items.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/items/Items.js');
}();

;