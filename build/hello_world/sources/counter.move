// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// This example demonstrates a basic use of a shared object.
/// Rules:
/// - anyone can create and share a counter
/// - everyone can increment a counter by 1
/// - the owner of the counter can reset it to any value
module counter::counter {
  /// A shared counter .
  public struct Counter has key {
    id: UID,
    owner: address,
    value: u64
	
  }

  /// Create and share a Counter object.
  public entry fun create(ctx: &mut TxContext) {
    let counter = Counter {
      id: object::new(ctx),
      owner: ctx.sender(),
      value: 0
    };
    transfer::share_object(counter)
  }

  /// Increment a counter by 1.
  public fun increment(counter: &mut Counter) {
    counter.value = counter.value + 1;
  }

  /// Set value (only runnable by the Counter owner)
  public fun set_value(counter: &mut Counter, value: u64, ctx: &TxContext) {
    assert!(counter.owner == ctx.sender(), 0);
    counter.value = value;
  }
}