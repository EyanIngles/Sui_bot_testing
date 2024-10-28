#[test_only]
module counter::test {
    use counter::counter::{create, Counter, increment, set_value};
        use sui::test_scenario;


    #[test]
    fun test_creating_counter(){
    let mut ctx = tx_context::dummy();
    create(&mut ctx);

    // Assert that the counter was shared successfully (if returned)
    // In a real scenario, you'd need to retrieve it or test the state change.
    assert!(true, 0); // Example placeholder assertion
    }
}