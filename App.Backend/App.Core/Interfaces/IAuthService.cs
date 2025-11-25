using App.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Core.Interfaces;

public interface IAuthService
{
    (string refreshToken, DateTime refreshTokenExpiration) AddRefreshToken(ApplicationUser user);
}
