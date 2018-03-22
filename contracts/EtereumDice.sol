pragma solidity ^0.4.18;

contract EthereumDice {

    uint constant _game_barier = 600;
    uint constant _game_max = 1000;
    uint constant _game_min = 0;
    uint constant _multiplier = 2;

    uint public _games_count = 0;
    uint public _players_count = 0;

    address private _owner;

    struct Player {
        string nickname;
        uint win_count;
        uint total_count;
        bool isVal;
    }
    
    mapping(address => Player) public _players;
    
    modifier onlyOwner {
        require(_owner == msg.sender);
        _;
    }
    
    modifier onlyNewPlayer {
        require(!_players[msg.sender].isVal);
        _;
    }
    
    modifier validBet(uint _bet_num) {
        require(_bet_num >= _game_min);
        require(_bet_num <= _game_max);
        _;
    }
    
    function Dice() public {
        // starts new game!
        _owner = msg.sender;
    }

    function joinGame(string player_nickname) public onlyNewPlayer {
        _players[msg.sender] = Player({nickname: player_nickname, win_count: 0, total_count: 0, isVal: true});
        _players_count++;
    }
    
    // payable
    function bet() public payable returns(bool) {
        address p_addr = msg.sender;
        uint random_number = uint(block.blockhash(block.number-1))%1000;
        _games_count++;
        if (random_number > _game_barier) {
            _players[p_addr].win_count += 1;
            _players[p_addr].total_count += 1;
            p_addr.transfer(msg.value * _multiplier);
            return true;
        } else {
            //  Fires event that player no win =(
            return false;
        }
    }

    function getWinningGames() public constant returns(uint) {
        return _players[msg.sender].win_count;
    }

    function getTotalGames() public constant returns(uint) {
        return _players[msg.sender].total_count;
    }
    
    // external as it consume too many gas
    // warn: Gas requirement of function Dice._players(address) high: infinite. If the gas requirement of a function is higher than the block gas limit, it cannot be executed. Please avoid loops in your functions or actions that modify large areas of storage (this includes clearing or copying arrays in storage)
    // function finishGame() external payable onlyOwner {
    //     uint random_number = uint(block.blockhash(block.number-1))%1000;
    //     address pl_addr;
    //     for(uint i = 0; i < _players_list.length; i++) {
    //         if (random_number < 500) {
    //             pl_addr = _players_list[i];
    //             pl_addr.transfer( _players[pl_addr].deposit * _multiplier);
    //         }
    //         delete _players[pl_addr];
    //     }
    //     delete _players_list;
    // }
}
