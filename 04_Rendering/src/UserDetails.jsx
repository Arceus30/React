export const UserDetails = ({
    name,
    isOnline,
    role,
    isPremium = false,
    isNew = false,
}) => {
    // 1.) Conditional Rendering using if else block
    // if (isOnline)
    //     return (
    //         <div>
    //             User Details:
    //             <h3>{name}</h3>
    //             <span>🟢 Online</span>
    //             <p>Available for chat</p>
    //             <button>Send Message</button>
    //         </div>
    //     );
    // else
    //     return (
    //         <div>
    //             User Details:
    //             <h3>{name}</h3>
    //             <span>🔴 Offline</span>
    //             <p>Not Available for chat</p>
    //             <small>Check back later</small>
    //         </div>
    //     );

    // 4.) Variables (best for complex logic)
    let roleBadge = null;
    if (role === "admin") {
        roleBadge = "<span> Admin</span>";
    } else if (role === "moderator") {
        roleBadge = <span> Moderator</span>;
    } else if ((role = "vip")) {
        roleBadge = <span> VIP</span>;
    }

    return (
        <div>
            User Details:
            <h3>{name}</h3>
            {/* 2.) Conditional Rendering using logical AND operator (&&) */}
            {isPremium && <span>⭐</span>}
            {isNew && <span>🎉</span>}
            {roleBadge}
            {/* 3.) Conditional Rendering using ternary statement */}
            <span>{isOnline ? "🟢 Online" : "🔴 Offline"}</span>
            <p>{isOnline ? "Available for chat" : "Not Available for chat"}</p>
            {isOnline ? (
                <button>Send Message</button>
            ) : (
                <small>Check back later</small>
            )}
        </div>
    );
};
