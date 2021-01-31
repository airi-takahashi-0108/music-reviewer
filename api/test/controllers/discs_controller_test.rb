require "test_helper"

class DiscsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @disc = discs(:one)
  end

  test "should get index" do
    get discs_url, as: :json
    assert_response :success
  end

  test "should create disc" do
    assert_difference('Disc.count') do
      post discs_url, params: { disc: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show disc" do
    get disc_url(@disc), as: :json
    assert_response :success
  end

  test "should update disc" do
    patch disc_url(@disc), params: { disc: {  } }, as: :json
    assert_response 200
  end

  test "should destroy disc" do
    assert_difference('Disc.count', -1) do
      delete disc_url(@disc), as: :json
    end

    assert_response 204
  end
end
