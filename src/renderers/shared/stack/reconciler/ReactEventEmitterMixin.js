/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEventEmitterMixin
 */

'use strict';

var EventPluginHub = require('EventPluginHub');

function runEventQueueInBatch(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false); // mouseEnter: -7
  // it takes events and enqueues them
}

var ReactEventEmitterMixin = {

  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   */
  handleTopLevel: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget) {
    var events = EventPluginHub.extractEvents(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ); // HERE magic gets done: _dispatchInstances and _dispatchListeners start
    // getting listed with info about an input and a form; before this there
    // was no direct info about it (only obtainable from native events)
    runEventQueueInBatch(events); // mouseEnter: -8
    // here it tells EventPluginHub to transform React and native info about
    // an event into an events array
  },
};

module.exports = ReactEventEmitterMixin;
